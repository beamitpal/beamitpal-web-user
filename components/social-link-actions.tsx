"use client";

import { Button } from "@/components/ui/button";
import { deleteSocialLink } from "@/app/actions/crud";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SocialLinkActions({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (confirm("Are you sure?")) {
      await deleteSocialLink(id);
      toast.success("Link deleted");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/social-links/${id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <Trash className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
