import { DegreeForm } from "@/components/degree-form";

export default async function NewDegreePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">New Degree</h2>
      <p className="text-muted-foreground">Add a new degree for this institution</p>
      <DegreeForm educationId={id} />
    </div>
  );
}
