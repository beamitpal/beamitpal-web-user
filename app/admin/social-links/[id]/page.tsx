import { SocialLinkForm } from "@/components/social-link-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditSocialLinkPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const link = await prisma.socialLink.findUnique({
    where: { id: parseInt(id) },
  });

  if (!link) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Social Link</h2>
      <SocialLinkForm link={link} />
    </div>
  );
}
