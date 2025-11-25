import { ProjectForm } from "@/components/project-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Project</h2>
      <ProjectForm project={project} />
    </div>
  );
}
