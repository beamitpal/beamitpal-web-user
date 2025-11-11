import prisma from '@/lib/prisma';
import type { Award } from "../types/awards";

export const AWARDS: Award[] = (
  await prisma.award.findMany({
    select: {
      id: true,
      prize: true,
      title: true,
      date: true,
      grade: true,
      description: true,
      referenceLink: true,
    },
    orderBy: {
      date: 'desc',
    },
  })
).map((award) => ({
  id: award.id,
  prize: award.prize,
  title: award.title,
  date: award.date,
  grade: award.grade || '',
  description: award.description,
  referenceLink: award.referenceLink ?? undefined,
}));