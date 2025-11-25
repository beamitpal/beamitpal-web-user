import { BlogForm } from "@/components/blog-form";

export default function NewBlogPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">New Blog</h2>
      <BlogForm />
    </div>
  );
}
