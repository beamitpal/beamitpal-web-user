
import { NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/features/blog/data/post";
import { getLLMText } from "@/features/blog/lib/get-llm-text";
import type { Post as BlogPost } from "@/features/blog/types/post";
import type { Post as DbPost } from "@/generated/prisma/client";


function safeDecode(s: string) { try { return decodeURIComponent(s); } catch { return s; } }
function normalizeSlug(raw: string) {
  const s = safeDecode(raw);
  if (s.endsWith(".mdx")) return s.slice(0, -4);
  if (s.endsWith(".md"))  return s.slice(0, -3);
  return s;
}

function toBlogPost(db: DbPost): BlogPost {
  const anyDb = db as any;
  const created = anyDb.metadata?.createdAt ?? db.createdAt;
  const updated = anyDb.metadata?.updatedAt ?? db.updatedAt;
  return {
    ...db,
    metadata: {
      title: anyDb.metadata?.title ?? anyDb.title ?? db.slug,
      description: anyDb.metadata?.description ?? anyDb.description ?? "",
      createdAt: typeof created === "string" ? created : created?.toISOString?.() ?? "",
      updatedAt: typeof updated === "string" ? updated : updated?.toISOString?.() ?? "",
    },
  } as unknown as BlogPost;
}

async function findPostByAnySlug(slugRaw: string) {
  const clean = normalizeSlug(slugRaw);
  let post = await getPostBySlug(clean);
  if (post) return post;

  post = await getPostBySlug(slugRaw); 
  if (post) return post;

  const all = await getAllPosts();
  const lowerClean = clean.toLowerCase();
  const lowerRaw = slugRaw.toLowerCase();
  return (
    all.find((p) => p.slug === clean) ||
    all.find((p) => p.slug === slugRaw) ||
    all.find((p) => p.slug.toLowerCase() === lowerClean) ||
    all.find((p) => p.slug.toLowerCase() === lowerRaw) ||
    null
  );
}


export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ slug: string }> } 
) {
  const { slug } = await ctx.params; 
  const dbPost = await findPostByAnySlug(slug);

  if (!dbPost) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const post = toBlogPost(dbPost);
  const body = await getLLMText(post);

  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
