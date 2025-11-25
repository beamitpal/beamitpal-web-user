"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCertification, updateCertification } from "@/app/actions/crud";
import { Certification } from "@prisma/client";
import { toast } from "sonner";

export function CertificationForm({ cert }: { cert?: Certification }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (cert) {
        await updateCertification(cert.id, formData);
        toast.success("Certification updated");
      } else {
        await createCertification(formData);
        toast.success("Certification created");
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
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={cert?.title} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="issuer">Issuer</Label>
        <Input id="issuer" name="issuer" defaultValue={cert?.issuer} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="issueDate">Issue Date</Label>
        <Input
          id="issueDate"
          name="issueDate"
          defaultValue={cert?.issueDate}
          placeholder="Jan 2024"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="issuerIconName">Issuer Icon Name</Label>
        <Input
          id="issuerIconName"
          name="issuerIconName"
          defaultValue={cert?.issuerIconName || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="issuerLogoURL">Issuer Logo URL</Label>
        <Input
          id="issuerLogoURL"
          name="issuerLogoURL"
          defaultValue={cert?.issuerLogoURL || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="credentialID">Credential ID</Label>
        <Input
          id="credentialID"
          name="credentialID"
          defaultValue={cert?.credentialID || ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="credentialURL">Credential URL</Label>
        <Input
          id="credentialURL"
          name="credentialURL"
          type="url"
          defaultValue={cert?.credentialURL || ""}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : cert ? "Update" : "Create"}
      </Button>
    </form>
  );
}
