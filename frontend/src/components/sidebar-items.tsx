"use client";

import { Home, Music } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function SidebarMenuItems() {
  const pathname = usePathname();
  let items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      active: false,
    },
    {
      title: "Create",
      url: "/create",
      icon: Music,
      active: true,
    },
  ];

  items = items.map((item) => ({
    ...item,
    active: pathname === item.url,
  }));
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.active}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
