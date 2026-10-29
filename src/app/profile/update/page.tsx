"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ProtectedPage } from "@/components/protected-page";
import { useToast } from "@/components/toast-provider";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedName = name.trim();
    if (updatedName.length < 2) {
      const message = "নাম অন্তত ২ অক্ষরের হতে হবে।";
      setError(message);
      toast(message, "error");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const result = await authClient.updateUser({ name: updatedName });
      if (result.error) {
        const message = result.error.message ?? "তথ্য আপডেট করা যায়নি।";
        setError(message);
        toast(message, "error");
        return;
      }
      toast("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "তথ্য আপডেট করা যায়নি।";
      setError(message);
      toast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ProtectedPage>
      <section className="page-container profile-page">
        <div className="breadcrumb"><Link href="/profile">আমার প্রোফাইল</Link><span aria-hidden="true">/</span><span>তথ্য পরিবর্তন</span></div>
        <div className="update-card">
          <p className="eyebrow">অ্যাকাউন্ট সেটিংস</p>
          <h1>আপনার তথ্য আপডেট করুন</h1>
          <p>বর্তমান নাম: {session?.user?.name}</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="profile-name">নতুন নাম</label>
            <input
              autoComplete="name"
              id="profile-name"
              minLength={2}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              value={name}
            />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary auth-submit" disabled={isSubmitting}>
              {isSubmitting ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
          </form>
        </div>
      </section>
    </ProtectedPage>
  );
}
