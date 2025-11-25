import { ExperienceForm } from "@/components/experience-form";

export default function NewExperiencePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">New Work Experience</h2>
      <p className="text-muted-foreground">Add a new company to your work history</p>
      <ExperienceForm />
    </div>
  );
}
