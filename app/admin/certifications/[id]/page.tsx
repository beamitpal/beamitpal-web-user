import { CertificationForm } from "@/components/certification-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditCertificationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const cert = await prisma.certification.findUnique({
    where: { id: parseInt(id) },
  });

  if (!cert) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Certification</h2>
      <CertificationForm cert={cert} />
    </div>
  );
}
