"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createExperience, updateExperience } from "@/app/actions/experience-education";
import { WorkExperience } from "@prisma/client";
import { toast } from "sonner";

export function ExperienceForm({ experience }: { experience?: WorkExperience }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (experience) {
        await updateExperience(experience.id, formData);
        toast.success("Company updated");
      } else {
        await createExperience(formData);
        toast.success("Company created");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid gap-2">
        <Label htmlFor="id">ID (unique)</Label>
        <Input
          id="id"
          name="id"
          defaultValue={experience?.id}
          required
          disabled={!!experience}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          defaultValue={experience?.companyName}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="companyLogo">Company Logo URL</Label>
        <Input
          id="companyLogo"
          name="companyLogo"
          defaultValue={experience?.companyLogo || ""}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isCurrentEmployer"
          name="isCurrentEmployer"
          defaultChecked={experience?.isCurrentEmployer}
        />
        <Label htmlFor="isCurrentEmployer">Current Employer</Label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : experience ? "Update Company" : "Create Company"}
      </Button>
    </form>
  );
}
