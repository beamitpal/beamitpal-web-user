import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const prisma = new PrismaClient();

export const revalidate = 0;

export default async function ExperiencePage() {
  const experiences = await prisma.workExperience.findMany({
    include: {
      positions: true,
    },
    orderBy: { companyName: "asc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus className="mr-2 h-4 w-4" /> New Company
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{exp.companyName}</CardTitle>
                  <CardDescription>
                    {exp.positions.length} position(s)
                    {exp.isCurrentEmployer && " • Current Employer"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/experience/${exp.id}`}>
                      View & Edit
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            {exp.positions.length > 0 && (
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {exp.positions.map((pos) => (
                    <li key={pos.id}>
                      • <strong>{pos.title}</strong> - {pos.employmentPeriod}
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
