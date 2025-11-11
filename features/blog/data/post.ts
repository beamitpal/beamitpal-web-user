
import { Post } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: [
      { pinned: 'desc' },     
      { createdAt: 'desc' }  
    ]
  });
}


export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({  
    where: { slug: slug }
  });
}

export async function getPostsByCategory(category: string) {
  return prisma.post.findMany({
    where: { category: category },
    orderBy: [
      { pinned: 'desc' },
      { createdAt: 'desc' }
    ]
  });
}

export function findNeighbour(posts: Post[], slug: string) {
  const len = posts.length;

  for (let i = 0; i < len; ++i) {
    if (posts[i].slug === slug) {
      return {
        previous: i > 0 ? posts[i - 1] : null,
        next: i < len - 1 ? posts[i + 1] : null,
      };
    }
  }

  return { previous: null, next: null };
}
