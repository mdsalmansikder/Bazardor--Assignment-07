"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/components/toast-provider";

type AuthFormProps = { mode: "signin" | "signup" };

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।";
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup";
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getNextPath() {
    const requestedPath = new URLSearchParams(window.location.search).get("next");
    return requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/";
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
      toast("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    }
  }, [toast]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (isSignUp && name.trim().length < 2) {
      setError("আপনার নাম অন্তত ২ অক্ষরের হতে হবে।");
      toast("আপনার নাম অন্তত ২ অক্ষরের হতে হবে।", "error");
      return;
    }
    if (password.length < 8) {
      setError("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।");
      toast("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isSignUp
        ? await authClient.signUp.email({
            name: name.trim(),
            email: email.trim(),
            password,
          })
        : await authClient.signIn.email({
            email: email.trim(),
            password,
          });

      if (result.error) {
        const message = result.error.message ?? "অনুরোধটি সম্পন্ন করা যায়নি।";
        setError(message);
        toast(message, "error");
        return;
      }

      if (isSignUp) {
        toast("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
        router.push("/signin?registered=1");
      } else {
        toast("সফলভাবে সাইন ইন হয়েছে।");
        router.push(getNextPath());
        router.refresh();
      }
    } catch (requestError) {
      const message = errorMessage(requestError);
      setError(message);
      toast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setError("");
    setIsSubmitting(true);
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: getNextPath(),
      });
      if (result.error) {
        const message = result.error.message ?? `${provider} দিয়ে সাইন ইন করা যায়নি।`;
        setError(message);
        toast(message, "error");
        setIsSubmitting(false);
      }
    } catch (requestError) {
      const message = errorMessage(requestError);
      setError(message);
      toast(message, "error");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page page-container">
      <div className="auth-card">
        <Link className="auth-brand" href="/">
          <span aria-hidden="true">🛒</span> বাজার দর
        </Link>
        <p className="eyebrow">{isSignUp ? "আমাদের সাথে যোগ দিন" : "আবার স্বাগতম"}</p>
        <h1>{isSignUp ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আপনার অ্যাকাউন্টে সাইন ইন করুন"}</h1>
        <p className="auth-description">
          {isSignUp
            ? "আপনার বাজারদর এক জায়গায় জানতে অ্যাকাউন্ট খুলুন।"
            : "বাজারের বিস্তারিত দাম দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <label>
              আপনার নাম
              <input
                autoComplete="name"
                minLength={2}
                onChange={(event) => setName(event.target.value)}
                placeholder="যেমন: রাহিম উদ্দিন"
                required
                value={name}
              />
            </label>
          )}
          <label>
            ইমেইল ঠিকানা
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            পাসওয়ার্ড
            <input
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="অন্তত ৮ অক্ষর"
              required
              type="password"
              value={password}
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "অপেক্ষা করুন..." : isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
          </button>
        </form>

        <div className="auth-divider"><span>অথবা</span></div>
        <div className="social-auth-actions">
          <button
            className="button social-button"
            disabled={isSubmitting}
            onClick={() => handleSocialSignIn("google")}
            type="button"
          >
            <span className="google-mark" aria-hidden="true">G</span> Google দিয়ে চালিয়ে যান
          </button>
          <button
            className="button social-button"
            disabled={isSubmitting}
            onClick={() => handleSocialSignIn("github")}
            type="button"
          >
            <span aria-hidden="true">◉</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>
        <p className="auth-switch">
          {isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"}{" "}
          <Link href={isSignUp ? "/signin" : "/signup"}>
            {isSignUp ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
          </Link>
        </p>
        <Link className="auth-home-link" href="/">← হোম পেজে ফিরে যান</Link>
      </div>
      <aside className="auth-aside">
        <span className="auth-aside-icon" aria-hidden="true">🥬</span>
        <p className="eyebrow">সচেতন কেনাকাটা, সাশ্রয়ী বাজার</p>
        <h2>কেনাকাটার আগে<br />জেনে নিন আজকের দাম।</h2>
        <p>বাজারভেদে পণ্যের দাম তুলনা করে নিন, পরিকল্পনা করুন সহজে।</p>
      </aside>
    </section>
  );
}
