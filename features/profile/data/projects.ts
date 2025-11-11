import prisma from '@/lib/prisma';
import type { Project } from "../types/projects";

export const PROJECTS: Project[] = (
  await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      periodStart: true,
      periodEnd: true,
      link: true,
      skills: true,
      description: true,
      logo: true,
      isExpanded: true,
    },
    orderBy: { periodStart: 'desc' }, 
  })
).map((proj) => ({
  id: proj.id,
  title: proj.title,
  period: {
    start: proj.periodStart,
    end: proj.periodEnd ?? undefined,
  },
  link: proj.link ?? '',
  skills: proj.skills,
  description: proj.description,
  logo: proj.logo ?? '',
  isExpanded: proj.isExpanded,
}));