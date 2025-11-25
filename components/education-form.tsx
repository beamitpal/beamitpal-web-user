"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEducation, updateEducation } from "@/app/actions/experience-education";
import { Education } from "@prisma/client";
import { toast } from "sonner";

export function EducationForm({ education }: { education?: Education }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (education) {
        await updateEducation(education.id, formData);
        toast.success("Institution updated");
      } else {
        await createEducation(formData);
        toast.success("Institution created");
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
          defaultValue={education?.id}
          required
          disabled={!!education}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="institutionName">Institution Name</Label>
        <Input
          id="institutionName"
          name="institutionName"
          defaultValue={education?.institutionName}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="institutionLogo">Institution Logo URL</Label>
        <Input
          id="institutionLogo"
          name="institutionLogo"
          defaultValue={education?.institutionLogo || ""}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : education ? "Update Institution" : "Create Institution"}
      </Button>
    </form>
  );
}
