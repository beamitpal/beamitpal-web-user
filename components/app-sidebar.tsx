"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, FileText, Briefcase, GraduationCap, Code, Share2, FolderGit2, Award, Trophy, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { AmitPalMark } from "@/brand/amitpal-mark";

const items = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Blogs", url: "/admin/blogs", icon: FileText },
  { title: "Experience", url: "/admin/experience", icon: Briefcase },
  { title: "Education", url: "/admin/education", icon: GraduationCap },
  { title: "Projects", url: "/admin/projects", icon: FolderGit2 },
  { title: "Tech Stack", url: "/admin/tech-stack", icon: Code },
  { title: "Social Links", url: "/admin/social-links", icon: Share2 },
  { title: "Certifications", url: "/admin/certifications", icon: Award },
  { title: "Awards", url: "/admin/awards", icon: Trophy },
  { title: "Profile", url: "/admin/profile", icon: User },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <AmitPalMark className="h-8 w-auto text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-sm">Admin Portal</span>
            <span className="text-xs text-muted-foreground">Beamitpal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => logoutAction()}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
