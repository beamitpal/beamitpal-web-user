"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const prisma = new PrismaClient();

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  pinned: z.boolean().optional(),
});

export async function createBlog(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    image: formData.get("image") as string,
    pinned: formData.get("pinned") === "on",
  };

  const validated = blogSchema.parse(data);

  await prisma.post.create({
    data: {
      ...validated,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blogs");
}

export async function updateBlog(id: number, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    image: formData.get("image") as string,
    pinned: formData.get("pinned") === "on",
  };

  const validated = blogSchema.parse(data);

  await prisma.post.update({
    where: { id },
    data: {
      ...validated,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${validated.slug}`);
  revalidatePath("/");
  redirect("/admin/blogs");
}

export async function deleteBlog(id: number) {
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
}
