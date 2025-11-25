"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// ========== TECH STACK ==========
export async function createTechStack(formData: FormData) {
  const categories = formData.get("categories") as string;
  await prisma.techStack.create({
    data: {
      key: formData.get("key") as string,
      title: formData.get("title") as string,
      href: formData.get("href") as string,
      categories: categories ? categories.split(",").map((c) => c.trim()) : [],
      theme: formData.get("theme") === "on",
    },
  });
  revalidatePath("/admin/tech-stack");
  redirect("/admin/tech-stack");
}

export async function updateTechStack(key: string, formData: FormData) {
  const categories = formData.get("categories") as string;
  await prisma.techStack.update({
    where: { key },
    data: {
      title: formData.get("title") as string,
      href: formData.get("href") as string,
      categories: categories ? categories.split(",").map((c) => c.trim()) : [],
      theme: formData.get("theme") === "on",
    },
  });
  revalidatePath("/admin/tech-stack");
  redirect("/admin/tech-stack");
}

export async function deleteTechStack(key: string) {
  await prisma.techStack.delete({ where: { key } });
  revalidatePath("/admin/tech-stack");
}

// ========== SOCIAL LINKS ==========
export async function createSocialLink(formData: FormData) {
  await prisma.socialLink.create({
    data: {
      icon: formData.get("icon") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      href: formData.get("href") as string,
    },
  });
  revalidatePath("/admin/social-links");
  redirect("/admin/social-links");
}

export async function updateSocialLink(id: number, formData: FormData) {
  await prisma.socialLink.update({
    where: { id },
    data: {
      icon: formData.get("icon") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      href: formData.get("href") as string,
    },
  });
  revalidatePath("/admin/social-links");
  redirect("/admin/social-links");
}

export async function deleteSocialLink(id: number) {
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/admin/social-links");
}

// ========== PROJECTS ==========
export async function createProject(formData: FormData) {
  const skills = formData.get("skills") as string;
  await prisma.project.create({
    data: {
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      periodStart: formData.get("periodStart") as string,
      periodEnd: formData.get("periodEnd") as string,
      link: formData.get("link") as string,
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      description: formData.get("description") as string,
      logo: formData.get("logo") as string,
      isExpanded: formData.get("isExpanded") === "on",
    },
  });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const skills = formData.get("skills") as string;
  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      periodStart: formData.get("periodStart") as string,
      periodEnd: formData.get("periodEnd") as string,
      link: formData.get("link") as string,
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      description: formData.get("description") as string,
      logo: formData.get("logo") as string,
      isExpanded: formData.get("isExpanded") === "on",
    },
  });
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

// ========== CERTIFICATIONS ==========
export async function createCertification(formData: FormData) {
  await prisma.certification.create({
    data: {
      title: formData.get("title") as string,
      issuer: formData.get("issuer") as string,
      issuerIconName: formData.get("issuerIconName") as string,
      issuerLogoURL: formData.get("issuerLogoURL") as string,
      issueDate: formData.get("issueDate") as string,
      credentialID: formData.get("credentialID") as string,
      credentialURL: formData.get("credentialURL") as string,
    },
  });
  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function updateCertification(id: number, formData: FormData) {
  await prisma.certification.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      issuer: formData.get("issuer") as string,
      issuerIconName: formData.get("issuerIconName") as string,
      issuerLogoURL: formData.get("issuerLogoURL") as string,
      issueDate: formData.get("issueDate") as string,
      credentialID: formData.get("credentialID") as string,
      credentialURL: formData.get("credentialURL") as string,
    },
  });
  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: number) {
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/admin/certifications");
}

// ========== AWARDS ==========
export async function createAward(formData: FormData) {
  await prisma.award.create({
    data: {
      id: formData.get("id") as string,
      prize: formData.get("prize") as string,
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      grade: formData.get("grade") as string,
      description: formData.get("description") as string,
      referenceLink: formData.get("referenceLink") as string,
    },
  });
  revalidatePath("/admin/awards");
  redirect("/admin/awards");
}

export async function updateAward(id: string, formData: FormData) {
  await prisma.award.update({
    where: { id },
    data: {
      prize: formData.get("prize") as string,
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      grade: formData.get("grade") as string,
      description: formData.get("description") as string,
      referenceLink: formData.get("referenceLink") as string,
    },
  });
  revalidatePath("/admin/awards");
  redirect("/admin/awards");
}

export async function deleteAward(id: string) {
  await prisma.award.delete({ where: { id } });
  revalidatePath("/admin/awards");
}
