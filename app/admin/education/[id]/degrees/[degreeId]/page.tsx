import { DegreeForm } from "@/components/degree-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditDegreePage({
  params,
}: {
  params: { id: string; degreeId: string };
}) {
  const { id, degreeId } = await params;
  
  const degree = await prisma.degree.findUnique({
    where: { id: degreeId },
  });

  if (!degree) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Degree</h2>
      <p className="text-muted-foreground">Update degree details</p>
      <DegreeForm degree={degree} educationId={id} />
    </div>
  );
}
