import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const prisma = new PrismaClient();

export default async function EducationPage() {
  const educations = await prisma.education.findMany({
    include: {
      degrees: true,
    },
    orderBy: { institutionName: "asc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Education</h2>
        <Button asChild>
          <Link href="/admin/education/new">
            <Plus className="mr-2 h-4 w-4" /> New Institution
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {educations.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{edu.institutionName}</CardTitle>
                  <CardDescription>
                    {edu.degrees.length} degree(s)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/education/${edu.id}`}>
                      View & Edit
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            {edu.degrees.length > 0 && (
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {edu.degrees.map((deg) => (
                    <li key={deg.id}>
                      • <strong>{deg.title}</strong> - {deg.studyPeriod}
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
