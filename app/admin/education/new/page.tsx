import { EducationForm } from "@/components/education-form";

export default function NewEducationPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">New Education</h2>
      <p className="text-muted-foreground">Add a new institution to your education history</p>
      <EducationForm />
    </div>
  );
}
