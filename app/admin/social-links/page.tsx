import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SocialLinkActions } from "@/components/social-link-actions";

const prisma = new PrismaClient();

export const revalidate = 0;

export default async function SocialLinksPage() {
  const links = await prisma.socialLink.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Social Links</h2>
        <Button asChild>
          <Link href="/admin/social-links/new">
            <Plus className="mr-2 h-4 w-4" /> New Link
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell>{link.icon}</TableCell>
                <TableCell className="font-medium">{link.title}</TableCell>
                <TableCell>{link.description}</TableCell>
                <TableCell className="truncate max-w-[200px]">{link.href}</TableCell>
                <TableCell>
                  <SocialLinkActions id={link.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
