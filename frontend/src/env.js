import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    AWS_ACCESS_KEY_ID: z.string().min(1).max(128),
    AWS_SECRET_ACCESS_KEY: z.string().min(1).max(128),
    AWS_ENDPOINT_URL_S3: z.string(),
    AWS_ENDPOINT_URL_IAM: z.string(),
    AWS_REGION: z.string().min(1).max(64),
    S3_BUCKET_NAME: z.string().min(1).max(64),
    GENERATE_FROM_DESCRIPTION_API_URL: z.string(),
    GENERATE_FROM_DESCRIBED_LYRICS_API_URL: z.string(),
    GENERATE_FROM_LYRICS_API_URL: z.string(),
    MODAL_KEY: z.string().min(1).max(128),
    MODAL_SECRET: z.string().min(1).max(128),
    BETTER_AUTH_SECRET: z.string(),
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_WEBHOOK_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    MODAL_KEY: process.env.MODAL_KEY,
    MODAL_SECRET: process.env.MODAL_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ENDPOINT_URL_S3: process.env.AWS_ENDPOINT_URL_S3,
    AWS_ENDPOINT_URL_IAM: process.env.AWS_ENDPOINT_URL_IAM,
    AWS_REGION: process.env.AWS_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    GENERATE_FROM_DESCRIPTION_API_URL:
      process.env.GENERATE_FROM_DESCRIPTION_API_URL,
    GENERATE_FROM_DESCRIBED_LYRICS_API_URL:
      process.env.GENERATE_FROM_DESCRIBED_LYRICS_API_URL,
    GENERATE_FROM_LYRICS_API_URL: process.env.GENERATE_FROM_LYRICS_API_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    // If you have client-side
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
