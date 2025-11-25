"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/app/actions/profile";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileForm({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await updateUserProfile(user.id, formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={user.firstName}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={user.lastName}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              name="displayName"
              defaultValue={user.displayName}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              defaultValue={user.username}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                name="gender"
                defaultValue={user.gender || ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pronouns">Pronouns</Label>
              <Input
                id="pronouns"
                name="pronouns"
                defaultValue={user.pronouns || ""}
                placeholder="they/them"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              className="min-h-[100px]"
              defaultValue={user.bio}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="flipSentences">Flip Sentences (comma-separated)</Label>
            <Input
              id="flipSentences"
              name="flipSentences"
              defaultValue={user.flipSentences.join(", ")}
            />
            <p className="text-xs text-muted-foreground">
              Rotating text displayed on your homepage
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              name="about"
              className="min-h-[150px]"
              defaultValue={user.about}
              required
            />
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              defaultValue={user.phoneNumber || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={user.address || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="url"
              defaultValue={user.website || ""}
            />
          </div>
        </TabsContent>

        <TabsContent value="professional" className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              defaultValue={user.jobTitle || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              name="avatar"
              type="url"
              defaultValue={user.avatar || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ogImage">OG Image URL</Label>
            <Input
              id="ogImage"
              name="ogImage"
              type="url"
              defaultValue={user.ogImage || ""}
            />
            <p className="text-xs text-muted-foreground">
              Image shown when sharing your portfolio on social media
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="namePronunciationUrl">Name Pronunciation URL</Label>
            <Input
              id="namePronunciationUrl"
              name="namePronunciationUrl"
              type="url"
              defaultValue={user.namePronunciationUrl || ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="keywords">SEO Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              name="keywords"
              defaultValue={user.keywords.join(", ")}
            />
            <p className="text-xs text-muted-foreground">
              Keywords for search engine optimization
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
