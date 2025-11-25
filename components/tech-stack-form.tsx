"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createTechStack, updateTechStack } from "@/app/actions/crud";
import { TechStack } from "@prisma/client";
import { toast } from "sonner";

export function TechStackForm({ item }: { item?: TechStack }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (item) {
        await updateTechStack(item.key, formData);
        toast.success("Tech stack updated");
      } else {
        await createTechStack(formData);
        toast.success("Tech stack created");
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
        <Label htmlFor="key">Key (unique identifier)</Label>
        <Input
          id="key"
          name="key"
          defaultValue={item?.key}
          required
          disabled={!!item}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={item?.title} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="href">URL</Label>
        <Input id="href" name="href" defaultValue={item?.href} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="categories">Categories (comma-separated)</Label>
        <Input
          id="categories"
          name="categories"
          defaultValue={item?.categories.join(", ")}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="theme"
          name="theme"
          defaultChecked={item?.theme}
        />
        <Label htmlFor="theme">Theme Support</Label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : item ? "Update" : "Create"}
      </Button>
    </form>
  );
}
