"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createBlog, updateBlog } from "@/app/actions/blog";
import { Post } from "@prisma/client";
import { toast } from "sonner";

export function BlogForm({ post }: { post?: Post }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (post) {
        await updateBlog(post.id, formData);
        toast.success("Blog updated");
      } else {
        await createBlog(formData);
        toast.success("Blog created");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={post?.title}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={post?.description || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          defaultValue={post?.category || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          defaultValue={post?.image || ""}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="pinned"
          name="pinned"
          defaultChecked={post?.pinned}
        />
        <Label htmlFor="pinned">Pinned</Label>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          className="min-h-[300px] font-mono"
          defaultValue={post?.content}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : post ? "Update Blog" : "Create Blog"}
      </Button>
    </form>
  );
}
