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
import { CertificationActions } from "@/components/certification-actions";

const prisma = new PrismaClient();

export const revalidate = 0;

export default async function CertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: { issueDate: "desc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
        <Button asChild>
          <Link href="/admin/certifications/new">
            <Plus className="mr-2 h-4 w-4" /> New Certification
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.title}</TableCell>
                <TableCell>{cert.issuer}</TableCell>
                <TableCell>{cert.issueDate}</TableCell>
                <TableCell>
                  <CertificationActions id={cert.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
