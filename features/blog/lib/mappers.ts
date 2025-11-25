import { Post } from "@prisma/client";
import type { Post as AppPost } from "../types/post";

export function toBlogPost(post: Post): AppPost {
  return {
    slug: post.slug,
    content: post.content,
    metadata: {
      title: post.title,
      description: post.description ?? "",
      image: post.image ?? undefined,
      category: post.category ?? undefined,
      icon: post.icon ?? undefined,
      new: post.isNew,
      pinned: post.pinned,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    },
  };
}
