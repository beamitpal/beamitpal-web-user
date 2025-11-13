import prisma from '@/lib/prisma';
import type { ExperienceItemType } from "@/components/work-experience";

export async function getEducation(): Promise<ExperienceItemType[]> {
  const rows = await prisma.education.findMany({
    select: {
      id: true,
      institutionName: true,
      institutionLogo: true,
      degrees: {
        select: {
          id: true,
          title: true,
          studyPeriod: true,
          description: true,
          icon: true,
          skills: true,
          isExpanded: true,
        },
        orderBy: { id: 'asc' },
      },
    },
    orderBy: { id: 'asc' },
  });

  return rows.map((edu) => ({
    id: edu.id,
    companyName: edu.institutionName,
    companyLogo: edu.institutionLogo ?? undefined,
    isCurrentEmployer: false,
    positions: edu.degrees.map((deg) => ({
      id: deg.id,
      title: deg.title,
      employmentPeriod: deg.studyPeriod,
      employmentType: undefined,
      description: deg.description,
      icon: (deg.icon === "education" || deg.icon === "code" || deg.icon === "design" || deg.icon === "business") ? deg.icon : undefined,
      skills: deg.skills,
      isExpanded: deg.isExpanded,
    })),
  }));
}