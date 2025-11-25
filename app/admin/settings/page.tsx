import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangePasswordForm } from "@/components/change-password-form";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your admin portal settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>
            Manage your admin credentials and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Current Credentials</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-mono">{process.env.ADMIN_USERNAME || "Not set"}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Password:</span>
                <span className="font-mono">••••••••</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              To change credentials, update the following environment variables and restart the server:
              <br />
              • <code className="bg-muted px-1 py-0.5 rounded">ADMIN_USERNAME</code>
              <br />
              • <code className="bg-muted px-1 py-0.5 rounded">ADMIN_PASSWORD</code>
              <br />
              • <code className="bg-muted px-1 py-0.5 rounded">ADMIN_SECRET</code> (JWT secret)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portal Information</CardTitle>
          <CardDescription>
            System and version information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Next.js Version:</span>
              <span>16.0.1</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Database:</span>
              <span>PostgreSQL</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Authentication:</span>
              <span>JWT</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">UI Framework:</span>
              <span>Shadcn UI</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>
            Useful resources and documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <a 
            href="https://nextjs.org/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-primary hover:underline"
          >
            Next.js Documentation →
          </a>
          <a 
            href="https://ui.shadcn.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-primary hover:underline"
          >
            Shadcn UI Documentation →
          </a>
          <a 
            href="https://www.prisma.io/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-primary hover:underline"
          >
            Prisma Documentation →
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
