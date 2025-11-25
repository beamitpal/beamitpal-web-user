"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createDegree, updateDegree } from "@/app/actions/experience-education";
import { Degree } from "@prisma/client";
import { toast } from "sonner";

export function DegreeForm({ 
  degree, 
  educationId 
}: { 
  degree?: Degree; 
  educationId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (degree) {
        await updateDegree(degree.id, formData);
        toast.success("Degree updated");
      } else {
        await createDegree(educationId, formData);
        toast.success("Degree created");
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
        <Label htmlFor="id">Degree ID (unique)</Label>
        <Input
          id="id"
          name="id"
          defaultValue={degree?.id}
          required
          disabled={!!degree}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Degree Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={degree?.title}
          placeholder="Bachelor of Science in Computer Science"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="studyPeriod">Study Period</Label>
        <Input
          id="studyPeriod"
          name="studyPeriod"
          defaultValue={degree?.studyPeriod}
          placeholder="2016 - 2020"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="icon">Icon Name (lucide-react)</Label>
        <Input
          id="icon"
          name="icon"
          defaultValue={degree?.icon || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input
          id="skills"
          name="skills"
          defaultValue={degree?.skills.join(", ")}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          className="min-h-[120px]"
          defaultValue={degree?.description}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isExpanded"
          name="isExpanded"
          defaultChecked={degree?.isExpanded}
        />
        <Label htmlFor="isExpanded">Expanded by Default</Label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : degree ? "Update Degree" : "Create Degree"}
      </Button>
    </form>
  );
}
