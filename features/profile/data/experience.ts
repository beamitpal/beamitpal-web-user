import prisma from '@/lib/prisma';
import type { ExperienceItemType } from "@/components/work-experience";

export const WORK_EXPERIENCE: ExperienceItemType[] = (
  await prisma.workExperience.findMany({
    select: {
      id: true,
      companyName: true,
      isCurrentEmployer: true,
      positions: {
        select: {
          id: true,
          title: true,
          employmentPeriod: true,
          employmentType: true,
          description: true,
          icon: true,
          skills: true,
          isExpanded: true,
        },
        orderBy: { id: 'asc' },
      },
    },
    orderBy: { id: 'asc' },
  })
).map((exp) => ({
  id: exp.id,
  companyName: exp.companyName,
  isCurrentEmployer: exp.isCurrentEmployer,
  positions: exp.positions.map((pos) => ({
    id: pos.id,
    title: pos.title,
    employmentPeriod: pos.employmentPeriod,
    employmentType: pos.employmentType ?? undefined,
    description: pos.description,
    icon: (pos.icon ?? undefined) as "code" | "design" | "business" | "education" | undefined,
    skills: pos.skills,
    isExpanded: pos.isExpanded,
  })),
}));