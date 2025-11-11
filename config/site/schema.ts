import type { WebSite, Person, WithContext, SearchAction } from "schema-dts";
import { FALLBACKS } from "@/config/site/static";

export function getWebSiteJsonLd(): WithContext<WebSite | Person> {
  const url = FALLBACKS.url;
  const displayName = FALLBACKS.displayName;
  const jobTitle = FALLBACKS.jobTitle;
  const description = FALLBACKS.bio;
  const ogImage = FALLBACKS.ogImage;

  const imageUrl =
    ogImage?.startsWith("http") ? ogImage : `${url}${ogImage ?? "/og.png"}`;

  const personSchema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayName,
    url,
    image: imageUrl,
    jobTitle,
    sameAs: [
      "https://github.com/beamitpal",
      "https://linkedin.com/in/beamitpal",
      "https://twitter.com/beamitpal",
    ],
  };


  const searchAction: SearchAction = {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${url}/search?q={search_term_string}`,
    },
  } as SearchAction;

  (searchAction as any)["query-input"] = "required name=search_term_string";

  const webSiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${displayName} Portfolio`,
    url,
    description,
    publisher: personSchema,
    mainEntity: personSchema,
    potentialAction: searchAction,
  };

  return webSiteSchema;
}
