import { SiteFooter } from "@/navigation/footer/site-footer";
import { SiteHeader } from "@/navigation/header/site-header";
import dynamic from "next/dynamic";

const ScrollTop = dynamic(() =>
  import("@/components/ui/scroll-top").then((mod) => mod.ScrollTop)
);

function AppLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
      <SiteFooter />
      <ScrollTop />
    </>
  )
}

export default AppLayout;