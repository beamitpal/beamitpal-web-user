import { PrismaClient } from "@prisma/client";
import { TechStackList } from "@/components/tech-stack-list";

const prisma = new PrismaClient();

export default async function TechStackPage() {
  const data = await prisma.techStack.findMany({
    orderBy: { title: "asc" },
  });

  return <TechStackList data={data} />;
}
