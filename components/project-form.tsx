"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createProject, updateProject } from "@/app/actions/crud";
import { Project } from "@prisma/client";
import { toast } from "sonner";

export function ProjectForm({ project }: { project?: Project }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (project) {
        await updateProject(project.id, formData);
        toast.success("Project updated");
      } else {
        await createProject(formData);
        toast.success("Project created");
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
          defaultValue={project?.id}
          required
          disabled={!!project}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={project?.title} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="periodStart">Period Start</Label>
          <Input
            id="periodStart"
            name="periodStart"
            defaultValue={project?.periodStart}
            placeholder="Jan 2024"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="periodEnd">Period End</Label>
          <Input
            id="periodEnd"
            name="periodEnd"
            defaultValue={project?.periodEnd || ""}
            placeholder="Present"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="link">Link</Label>
        <Input
          id="link"
          name="link"
          type="url"
          defaultValue={project?.link || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="logo">Logo URL</Label>
        <Input id="logo" name="logo" defaultValue={project?.logo || ""} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input
          id="skills"
          name="skills"
          defaultValue={project?.skills.join(", ")}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          className="min-h-[100px]"
          defaultValue={project?.description}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isExpanded"
          name="isExpanded"
          defaultChecked={project?.isExpanded}
        />
        <Label htmlFor="isExpanded">Expanded by Default</Label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
