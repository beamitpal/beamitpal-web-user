"use client";

import { DataTable, Column } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { deleteTechStack } from "@/app/actions/crud";
import { TechStack } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  data: TechStack[];
};

const columns: Column<TechStack>[] = [
  { header: "Key", accessor: "key" },
  { header: "Title", accessor: "title" },
  { header: "URL", accessor: "href" },
  { header: "Categories", accessor: (item) => item.categories.join(", ") },
];

export function TechStackList({ data }: Props) {
  const router = useRouter();

  async function handleDelete(item: TechStack) {
    await deleteTechStack(item.key);
    toast.success("Tech stack deleted");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
        <Button asChild>
          <Link href="/admin/tech-stack/new">
            <Plus className="mr-2 h-4 w-4" /> New Item
          </Link>
        </Button>
      </div>
      <DataTable
        data={data}
        columns={columns}
        editHref={(item) => `/admin/tech-stack/${item.key}`}
        onDelete={handleDelete}
        idAccessor="key"
      />
    </div>
  );
}
