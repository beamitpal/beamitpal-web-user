"use server";

import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ user: "admin", expires });

    (await cookies()).set("admin_session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  }

  return { success: false, error: "Invalid credentials" };
}

export async function logoutAction() {
  (await cookies()).delete("admin_session");
  redirect("/login");

}
