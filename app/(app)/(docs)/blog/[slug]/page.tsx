import dayjs from "dayjs";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import { InlineTOC } from "@/components/inline-toc";
import { MDX } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/typography";
import { SITE_URL } from "@/config/site/static";
import { PostKeyboardShortcuts } from "@/features/blog/components/post-keyboard-shortcut";
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions";
import { PostShareMenu } from "@/features/blog/components/post-share-menu";

import {
  findNeighbour,
  getAllPosts,
  getPostBySlug,
} from "@/features/blog/data/post";

import { USERS } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";



export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: Post) => ({ slug: post.slug }));
}



export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { title, description, createdAt, updatedAt } = post;
  const postUrl = getPostUrl(post);
  const ogImage = `/og/simple?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: { canonical: postUrl },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: dayjs(createdAt).toISOString(),
      modifiedTime: dayjs(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}


function getPageJsonLd(post: Post, opts: { siteUrl: string; user: {
  displayName: string; username: string; avatar: string;
}}): WithContext<PageSchema> {
  const { siteUrl, user } = opts;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description ?? "",
    image: `/og/simple?title=${encodeURIComponent(post.title)}`,
    url: `${siteUrl}${getPostUrl(post)}`,
    datePublished: dayjs(post.createdAt).toISOString(),
    dateModified: dayjs(post.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: user.displayName,
      identifier: user.username,
      image: user.avatar,
    },
  };
}



export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const user = await USERS();

  const toc = getTableOfContents(post.content);
  const allPosts = await getAllPosts();
  const { previous, next } = findNeighbour(allPosts, slug);

  const pageJsonLd = getPageJsonLd(post, {
    siteUrl: SITE_URL,
    user: {
      displayName: user.displayName,
      username: user.username,
      avatar: user.avatar,
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PostKeyboardShortcuts basePath="/blog" previous={previous} next={next} />

      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
          variant="link"
          asChild
        >
          <Link href="/blog">
            <ArrowLeftIcon />
            Blog
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <LLMCopyButtonWithViewOptions
            markdownUrl={`${getPostUrlLLM(post)}.mdx`}
            isComponent={post.category === "components"}
          />

          <PostShareMenu url={getPostUrl(post)} />

          {previous && (
            <Button variant="secondary" size="icon-sm" asChild>
              <Link href={`/blog/${previous.slug}`}>
                <ArrowLeftIcon />
                <span className="sr-only">Previous</span>
              </Link>
            </Button>
          )}

          {next && (
            <Button variant="secondary" size="icon-sm" asChild>
              <Link href={`/blog/${next.slug}`}>
                <span className="sr-only">Next</span>
                <ArrowRightIcon />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="screen-line-before screen-line-after">
        <div
          className={cn(
            "h-8",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />
      </div>

      <Prose className="px-4">
        <h1 className="screen-line-after mb-6 font-semibold">{post.title}</h1>

        <p className="lead mt-6 mb-6">{post.description}</p>

        <InlineTOC items={toc} />

        <div>
          <MDX code={post.content} />
        </div>
      </Prose>

      <div className="screen-line-before h-4 w-full" />
    </>
  );
}



function getPostUrl(post: Post) {
  const isComponent = post.category === "components";
  return isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`;
}

function getPostUrlLLM(post: Post) {
  const isComponent = post.category === "components";
  return isComponent ? `/components/${post.slug}` : `/blog.mdx/${post.slug}`;
}

