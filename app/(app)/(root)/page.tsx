import dayjs from "dayjs";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { About } from "@/features/profile/about";
import { Overview } from "@/features/profile/overview";
import { SocialLinks } from "@/features/profile/social-links";
import { cn } from "@/lib/utils";
import { ProfileCover } from "@/features/profile/profile-cover";
import { ProfileHeader } from "@/features/profile/profile-header";
import Experience from "@/features/profile/experience";
import { Projects } from "@/features/profile/projects";
import { Awards } from "@/features/profile/awards";
import { Certifications } from "@/features/profile/certifications";
import { TeckStack } from "@/features/profile/tech-stack";
import { Brand } from "@/features/profile/brand";
import Education from "@/features/profile/education";
import { Blog } from "@/features/profile/blog";
import { USERS } from "@/features/profile/data/user";
import ContactForm from "@/features/profile/contact/form";

export default async function Page() {
  const user = await USERS();

  const pageJsonLd: WithContext<PageSchema> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(user.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: user.displayName,
      identifier: user.username,
      image: user.avatar,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl">
        <ProfileCover />
        <ProfileHeader />
        <Separator />
        <Overview />
        <Separator />

        <SocialLinks />
        <Separator />

        <About />
        <Separator />

        <TeckStack />
        <Separator />

        <Blog />
        <Separator />

        <Experience />
        <Separator />

        <Education />
        <Separator />

        <Projects />
        <Separator />

        <Awards />
        <Separator />

        <Certifications />
        <Separator />

        <ContactForm />
        <Separator />

        <Brand />
        <Separator />
      </div>
    </>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
