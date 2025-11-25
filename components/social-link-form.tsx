"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSocialLink, updateSocialLink } from "@/app/actions/crud";
import { SocialLink } from "@prisma/client";
import { toast } from "sonner";

export function SocialLinkForm({ link }: { link?: SocialLink }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (link) {
        await updateSocialLink(link.id, formData);
        toast.success("Link updated");
      } else {
        await createSocialLink(formData);
        toast.success("Link created");
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
        <Label htmlFor="icon">Icon Name (lucide-react)</Label>
        <Input id="icon" name="icon" defaultValue={link?.icon} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={link?.title} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          defaultValue={link?.description || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="href">URL</Label>
        <Input
          id="href"
          name="href"
          type="url"
          defaultValue={link?.href}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : link ? "Update Link" : "Create Link"}
      </Button>
    </form>
  );
}
