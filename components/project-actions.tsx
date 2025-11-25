"use client";

import { Button } from "@/components/ui/button";
import { deleteProject } from "@/app/actions/crud";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ProjectActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      toast.success("Project deleted");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/projects/${id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
