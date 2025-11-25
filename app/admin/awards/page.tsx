import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AwardActions } from "@/components/award-actions";

const prisma = new PrismaClient();

export default async function AwardsPage() {
  const awards = await prisma.award.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Awards</h2>
        <Button asChild>
          <Link href="/admin/awards/new">
            <Plus className="mr-2 h-4 w-4" /> New Award
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prize</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {awards.map((award) => (
              <TableRow key={award.id}>
                <TableCell className="font-medium">{award.prize}</TableCell>
                <TableCell>{award.title}</TableCell>
                <TableCell>{award.date}</TableCell>
                <TableCell>{award.grade}</TableCell>
                <TableCell>
                  <AwardActions id={award.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
