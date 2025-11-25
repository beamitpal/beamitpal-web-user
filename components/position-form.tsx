"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createPosition, updatePosition } from "@/app/actions/experience-education";
import { WorkPosition } from "@prisma/client";
import { toast } from "sonner";

export function PositionForm({ 
  position, 
  experienceId 
}: { 
  position?: WorkPosition; 
  experienceId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (position) {
        await updatePosition(position.id, formData);
        toast.success("Position updated");
      } else {
        await createPosition(experienceId, formData);
        toast.success("Position created");
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
        <Label htmlFor="id">Position ID (unique)</Label>
        <Input
          id="id"
          name="id"
          defaultValue={position?.id}
          required
          disabled={!!position}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={position?.title}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="employmentPeriod">Employment Period</Label>
        <Input
          id="employmentPeriod"
          name="employmentPeriod"
          defaultValue={position?.employmentPeriod}
          placeholder="Jan 2020 - Dec 2022"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="employmentType">Employment Type</Label>
        <Input
          id="employmentType"
          name="employmentType"
          defaultValue={position?.employmentType || ""}
          placeholder="Full-time"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="icon">Icon Name (lucide-react)</Label>
        <Input
          id="icon"
          name="icon"
          defaultValue={position?.icon || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input
          id="skills"
          name="skills"
          defaultValue={position?.skills.join(", ")}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          className="min-h-[120px]"
          defaultValue={position?.description}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isExpanded"
          name="isExpanded"
          defaultChecked={position?.isExpanded}
        />
        <Label htmlFor="isExpanded">Expanded by Default</Label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : position ? "Update Position" : "Create Position"}
      </Button>
    </form>
  );
}
