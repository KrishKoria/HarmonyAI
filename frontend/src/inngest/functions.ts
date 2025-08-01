import { db } from "@/server/db";
import { inngest } from "./client";
import { env } from "@/env";

export const generateSong = inngest.createFunction(
  {
    id: "generate-song",
    concurrency: {
      limit: 1,
      key: "event.data.userId",
    },
    onFailure: async ({ event }) => {
      await db.song.update({
        where: {
          id: (event?.data?.event?.data as { songId: string }).songId,
        },
        data: {
          status: "failed",
        },
      });
    },
  },
  { event: "generate-song-event" },
  async ({ event, step }) => {
    const { songId } = event.data as { songId: string; userId: string };

    const { userId, credits, endpoint, body } = await step.run(
      "check-credits",
      async () => {
        const song = await db.song.findUniqueOrThrow({
          where: { id: songId },
          select: {
            prompt: true,
            lyrics: true,
            fullDescribedSong: true,
            describedLyrics: true,
            instrumental: true,
            guidanceScale: true,
            inferStep: true,
            audioDuration: true,
            seed: true,
            user: {
              select: {
                id: true,
                credits: true,
              },
            },
          },
        });

        type RequestBody = {
          guidance_scale?: number;
          infer_step?: number;
          audio_duration?: number;
          seed?: number;
          full_described_song?: string;
          prompt?: string;
          lyrics?: string;
          described_lyrics?: string;
          instrumental?: boolean;
        };
        let endpoint = "";
        let body: RequestBody = {};
        const commanParameters = {
          guidance_scale: song.guidanceScale ?? undefined,
          infer_step: song.inferStep ?? undefined,
          audio_duration: song.audioDuration ?? undefined,
          seed: song.seed ?? undefined,
          instrumental: song.instrumental,
        };

        if (song.fullDescribedSong) {
          endpoint = env.GENERATE_FROM_DESCRIPTION_API_URL;
          body = {
            ...commanParameters,
            full_described_song: song.fullDescribedSong,
          };
        } else if (song.lyrics && song.prompt) {
          endpoint = env.GENERATE_FROM_LYRICS_API_URL;
          body = {
            ...commanParameters,
            lyrics: song.lyrics,
            prompt: song.prompt,
          };
        } else if (song.describedLyrics && song.prompt) {
          endpoint = env.GENERATE_FROM_DESCRIBED_LYRICS_API_URL;
          body = {
            ...commanParameters,
            described_lyrics: song.describedLyrics,
            prompt: song.prompt,
          };
        }
        if (!endpoint) {
          throw new Error(
            "No valid endpoint for song generation. Please ensure all required fields are filled.",
          );
        }
        return {
          userId: song.user.id,
          credits: song.user.credits,
          endpoint,
          body,
        };
      },
    );

    if (credits > 0) {
      await step.run("set-status-processing", async () => {
        return await db.song.update({
          where: {
            id: songId,
          },
          data: {
            status: "processing",
          },
        });
      });
      const response = await step.fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Modal-Key": env.MODAL_KEY,
          "Modal-Secret": env.MODAL_SECRET,
        },
      });
      await step.run("update-song-result", async () => {
        const responseData = response.ok
          ? ((await response.json()) as {
              s3_key: string;
              cover_image_s3_key: string;
              categories: string[];
            })
          : null;
        await db.song.update({
          where: {
            id: songId,
          },
          data: {
            s3Key: responseData?.s3_key,
            thumbnailS3Key: responseData?.cover_image_s3_key,
            status: response.ok ? "processed" : "failed",
          },
        });
        if (responseData && responseData.categories.length > 0) {
          await db.song.update({
            where: { id: songId },
            data: {
              categories: {
                connectOrCreate: responseData.categories.map(
                  (categoryName) => ({
                    where: { name: categoryName },
                    create: { name: categoryName },
                  }),
                ),
              },
            },
          });
        }
      });
      return await step.run("deduct-credits", async () => {
        if (!response.ok) return;

        return await db.user.update({
          where: { id: userId },
          data: {
            credits: {
              decrement: 1,
            },
          },
        });
      });
    } else {
      await step.run("set-status-no-credits", async () => {
        return await db.song.update({
          where: {
            id: songId,
          },
          data: {
            status: "no credits",
          },
        });
      });
    }
  },
);
