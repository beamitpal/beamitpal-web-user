import { PositionForm } from "@/components/position-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditPositionPage({
  params,
}: {
  params: { id: string; positionId: string };
}) {
  const { id, positionId } = await params;
  
  const position = await prisma.workPosition.findUnique({
    where: { id: positionId },
  });

  if (!position) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Position</h2>
      <p className="text-muted-foreground">Update position details</p>
      <PositionForm position={position} experienceId={id} />
    </div>
  );
}
