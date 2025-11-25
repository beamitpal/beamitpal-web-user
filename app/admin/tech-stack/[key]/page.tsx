import { TechStackForm } from "@/components/tech-stack-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditTechStackPage({
  params,
}: {
  params: { key: string };
}) {
  const { key } = await params;
  const item = await prisma.techStack.findUnique({
    where: { key },
  });

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Tech Stack</h2>
      <TechStackForm item={item} />
    </div>
  );
}
