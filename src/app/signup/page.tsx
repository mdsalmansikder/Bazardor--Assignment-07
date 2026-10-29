import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
