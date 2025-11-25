"use client";

import { Button } from "@/components/ui/button";
import { deleteDegree } from "@/app/actions/experience-education";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DegreeActions({ id, educationId }: { id: string; educationId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this degree?")) {
      await deleteDegree(id);
      toast.success("Degree deleted");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/education/${educationId}/degrees/${id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
