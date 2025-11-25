import { BlogForm } from "@/components/blog-form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Edit Blog</h2>
      <BlogForm post={post} />
    </div>
  );
}
