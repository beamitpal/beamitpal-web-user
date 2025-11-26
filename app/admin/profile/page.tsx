import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile-form";

const prisma = new PrismaClient();

export const revalidate = 0;

export default async function ProfilePage() {

  const user = await prisma.user.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and portfolio details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            This information appears on your public portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <ProfileForm user={user} />
          ) : (
            <p className="text-muted-foreground">No user profile found. Please create one in the database.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
