import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { ExperienceForm } from "@/components/experience-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PositionActions } from "@/components/position-actions";

const prisma = new PrismaClient();

export default async function ExperienceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const experience = await prisma.workExperience.findUnique({
    where: { id },
    include: {
      positions: {
        orderBy: { employmentPeriod: "desc" },
      },
    },
  });

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Work Experience</h2>
        <p className="text-muted-foreground">Manage {experience.companyName} and its positions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceForm experience={experience} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Positions</CardTitle>
          <Button asChild size="sm">
            <Link href={`/admin/experience/${id}/positions/new`}>
              <Plus className="mr-2 h-4 w-4" /> Add Position
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
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experience.positions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No positions added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  experience.positions.map((position) => (
                    <TableRow key={position.id}>
                      <TableCell className="font-medium">{position.title}</TableCell>
                      <TableCell>{position.employmentPeriod}</TableCell>
                      <TableCell>{position.employmentType}</TableCell>
                      <TableCell>
                        <PositionActions id={position.id} experienceId={id} />
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
