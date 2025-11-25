"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// ========== WORK EXPERIENCE ==========
export async function createExperience(formData: FormData) {
  await prisma.workExperience.create({
    data: {
      id: formData.get("id") as string,
      companyName: formData.get("companyName") as string,
      companyLogo: formData.get("companyLogo") as string,
      isCurrentEmployer: formData.get("isCurrentEmployer") === "on",
    },
  });
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await prisma.workExperience.update({
    where: { id },
    data: {
      companyName: formData.get("companyName") as string,
      companyLogo: formData.get("companyLogo") as string,
      isCurrentEmployer: formData.get("isCurrentEmployer") === "on",
    },
  });
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await prisma.workExperience.delete({ where: { id } });
  revalidatePath("/admin/experience");
}

// ========== WORK POSITION (nested under Experience) ==========
export async function createPosition(experienceId: string, formData: FormData) {
  const skills = formData.get("skills") as string;
  await prisma.workPosition.create({
    data: {
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      employmentPeriod: formData.get("employmentPeriod") as string,
      employmentType: formData.get("employmentType") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      isExpanded: formData.get("isExpanded") === "on",
      experienceId,
    },
  });
  revalidatePath(`/admin/experience/${experienceId}`);
  redirect(`/admin/experience/${experienceId}`);
}

export async function updatePosition(id: string, formData: FormData) {
  const skills = formData.get("skills") as string;
  await prisma.workPosition.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      employmentPeriod: formData.get("employmentPeriod") as string,
      employmentType: formData.get("employmentType") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      isExpanded: formData.get("isExpanded") === "on",
    },
  });
  const position = await prisma.workPosition.findUnique({ where: { id } });
  revalidatePath(`/admin/experience/${position?.experienceId}`);
  redirect(`/admin/experience/${position?.experienceId}`);
}

export async function deletePosition(id: string) {
  const position = await prisma.workPosition.findUnique({ where: { id } });
  await prisma.workPosition.delete({ where: { id } });
  revalidatePath(`/admin/experience/${position?.experienceId}`);
}

// ========== EDUCATION ==========
export async function createEducation(formData: FormData) {
  await prisma.education.create({
    data: {
      id: formData.get("id") as string,
      institutionName: formData.get("institutionName") as string,
      institutionLogo: formData.get("institutionLogo") as string,
    },
  });
  revalidatePath("/admin/education");
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  await prisma.education.update({
    where: { id },
    data: {
      institutionName: formData.get("institutionName") as string,
      institutionLogo: formData.get("institutionLogo") as string,
    },
  });
  revalidatePath("/admin/education");
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/admin/education");
}

// ========== DEGREE (nested under Education) ==========
export async function createDegree(educationId: string, formData: FormData) {
  const skills = formData.get("skills") as string;
  await prisma.degree.create({
    data: {
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      studyPeriod: formData.get("studyPeriod") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      isExpanded: formData.get("isExpanded") === "on",
      educationId,
    },
  });
  revalidatePath(`/admin/education/${educationId}`);
  redirect(`/admin/education/${educationId}`);
}

export async function updateDegree(id: string, formData: FormData) {
  const skills = formData.get("skills") as string;
  await prisma.degree.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      studyPeriod: formData.get("studyPeriod") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      isExpanded: formData.get("isExpanded") === "on",
    },
  });
  const degree = await prisma.degree.findUnique({ where: { id } });
  revalidatePath(`/admin/education/${degree?.educationId}`);
  redirect(`/admin/education/${degree?.educationId}`);
}

export async function deleteDegree(id: string) {
  const degree = await prisma.degree.findUnique({ where: { id } });
  await prisma.degree.delete({ where: { id } });
  revalidatePath(`/admin/education/${degree?.educationId}`);
}
