"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAward, updateAward } from "@/app/actions/crud";
import { Award } from "@prisma/client";
import { toast } from "sonner";

export function AwardForm({ award }: { award?: Award }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (award) {
        await updateAward(award.id, formData);
        toast.success("Award updated");
      } else {
        await createAward(formData);
        toast.success("Award created");
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
        <Label htmlFor="id">ID (unique)</Label>
        <Input
          id="id"
          name="id"
          defaultValue={award?.id}
          required
          disabled={!!award}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="prize">Prize</Label>
        <Input id="prize" name="prize" defaultValue={award?.prize} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={award?.title} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          defaultValue={award?.date}
          placeholder="Jan 2024"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="grade">Grade/Level</Label>
        <Input id="grade" name="grade" defaultValue={award?.grade || ""} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          className="min-h-[100px]"
          defaultValue={award?.description}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="referenceLink">Reference Link</Label>
        <Input
          id="referenceLink"
          name="referenceLink"
          type="url"
          defaultValue={award?.referenceLink || ""}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : award ? "Update Award" : "Create Award"}
      </Button>
    </form>
  );
}
