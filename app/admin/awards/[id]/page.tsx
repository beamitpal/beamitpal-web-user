import { AwardForm } from "@/components/award-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditAwardPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const award = await prisma.award.findUnique({
    where: { id },
  });

  if (!award) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Award</h2>
      <AwardForm award={award} />
    </div>
  );
}
