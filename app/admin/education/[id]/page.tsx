import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { EducationForm } from "@/components/education-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DegreeActions } from "@/components/degree-actions";

const prisma = new PrismaClient();

export default async function EducationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const education = await prisma.education.findUnique({
    where: { id },
    include: {
      degrees: {
        orderBy: { studyPeriod: "desc" },
      },
    },
  });

  if (!education) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Education</h2>
        <p className="text-muted-foreground">Manage {education.institutionName} and its degrees</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Institution Details</CardTitle>
        </CardHeader>
        <CardContent>
          <EducationForm education={education} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Degrees</CardTitle>
          <Button asChild size="sm">
            <Link href={`/admin/education/${id}/degrees/new`}>
              <Plus className="mr-2 h-4 w-4" /> Add Degree
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {education.degrees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No degrees added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  education.degrees.map((degree) => (
                    <TableRow key={degree.id}>
                      <TableCell className="font-medium">{degree.title}</TableCell>
                      <TableCell>{degree.studyPeriod}</TableCell>
                      <TableCell>
                        <DegreeActions id={degree.id} educationId={id} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
