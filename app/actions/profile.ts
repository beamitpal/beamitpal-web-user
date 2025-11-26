"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function updateUserProfile(id: number, formData: FormData) {
  const keywords = (formData.get("keywords") as string) || "";
  const flipSentences = (formData.get("flipSentences") as string) || "";

  await prisma.user.update({
    where: { id },
    data: {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      displayName: formData.get("displayName") as string,
      username: formData.get("username") as string,
      gender: formData.get("gender") as string,
      pronouns: formData.get("pronouns") as string,
      bio: formData.get("bio") as string,
      flipSentences: flipSentences ? flipSentences.split(",").map((s) => s.trim()) : [],
      address: formData.get("address") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string,
      jobTitle: formData.get("jobTitle") as string,
      about: formData.get("about") as string,
      avatar: formData.get("avatar") as string,
      ogImage: formData.get("ogImage") as string,
      namePronunciationUrl: formData.get("namePronunciationUrl") as string,
      keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
    },
  });

  revalidatePath("/admin/profile");
  revalidatePath("/");
  redirect("/admin/profile");
}
