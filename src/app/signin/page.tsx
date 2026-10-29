import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
