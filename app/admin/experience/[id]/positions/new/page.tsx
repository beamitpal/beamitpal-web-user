import { PositionForm } from "@/components/position-form";

export default async function NewPositionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">New Position</h2>
      <p className="text-muted-foreground">Add a new position for this company</p>
      <PositionForm experienceId={id} />
    </div>
  );
}
