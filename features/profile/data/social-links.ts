
import type { SocialLink } from "../types/social-links";
import prisma from '@/lib/prisma';

export async function getSocialLinks(): Promise<SocialLink[]> {
  const rows = await prisma.socialLink.findMany({
    select: {
      icon: true,
      title: true,
      description: true,
      href: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return rows.map(link => ({
    ...link,
    description: link.description ?? undefined,
  }));
}