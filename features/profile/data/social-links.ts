
import type { SocialLink } from "../types/social-links";
import prisma from '@/lib/prisma';


export const SOCIAL_LINKS: SocialLink[] = (await prisma.socialLink.findMany({
  select: {
    icon: true,
    title: true,
    description: true,
    href: true,
  },
  orderBy: {
    id: 'asc',
  },
})).map(link => ({
  ...link,
  description: link.description ?? undefined,
}));