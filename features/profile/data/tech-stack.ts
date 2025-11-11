import type { TechStack } from "../types/tech-stack";
import prisma from '@/lib/prisma';

export const TECH_STACK: TechStack[] = (await prisma.techStack.findMany({
  select: {
    key: true,
    title: true,
    href: true,
    categories: true,
    theme: true,
  },
  orderBy: {
    key: 'asc',
  },
})).map(item => ({
  key: item.key,
  title: item.title,
  href: item.href,
  categories: item.categories,
  theme: item.theme ?? false,
}));