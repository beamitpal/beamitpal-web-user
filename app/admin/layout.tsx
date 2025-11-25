import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AmitPalMark } from "@/brand/amitpal-mark";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
          <SidebarTrigger className="shrink-0" />
          <Link href="/admin" className="flex items-center gap-2">
            <AmitPalMark className="h-6 w-auto text-primary" />
            <span className="font-semibold">Admin Portal</span>
          </Link>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
