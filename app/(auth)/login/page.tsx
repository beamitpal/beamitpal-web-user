"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AmitPalMark } from "@/brand/amitpal-mark";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const result = await loginAction(formData);
      if (result.success) {
        toast.success("Logged in successfully");
        router.push("/admin");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-background to-muted px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <AmitPalMark className="h-12 w-auto text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the admin panel
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Secure access to manage your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Protected by secure authentication
        </p>
      </div>
    </div>
  );
}
