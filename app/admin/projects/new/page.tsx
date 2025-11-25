import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">New Project</h2>
      <ProjectForm />
    </div>
  );
}
