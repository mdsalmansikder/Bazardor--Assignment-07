"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/components/toast-provider";

const subscribeToDate = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const interval = window.setInterval(callback, 60_000);
  return () => window.clearInterval(interval);
};

const getBanglaDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

const getServerDate = () => "আজকের বাজার, এক নজরে";

const categories = [
  { slug: "chal", label: "চাল", icon: "🍚" },
  { slug: "dal", label: "ডাল", icon: "🫘" },
  { slug: "tel", label: "তেল", icon: "🛢️" },
  { slug: "sobji", label: "সবজি", icon: "🥬" },
  { slug: "mach", label: "মাছ", icon: "🐟" },
  { slug: "mangsho", label: "মাংস", icon: "🍗" },
  { slug: "dim-dui", label: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", label: "মসলা", icon: "🌶️" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const { data: session, isPending } = authClient.useSession();
  const banglaDate = useSyncExternalStore(subscribeToDate, getBanglaDate, getServerDate);

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast(result.error.message ?? "সাইন আউট করা যায়নি।", "error");
        return;
      }
      toast("আপনি সাইন আউট করেছেন।");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "সাইন আউট করা যায়নি।",
        "error",
      );
    }
  }

  return (
    <header className="site-header">
      <div className="header-main page-container">
        <Link className="brand" href="/" aria-label="বাজার দর - হোম">
          <span className="brand-icon" aria-hidden="true">🛒</span>
          <span className="brand-copy">
            <span className="brand-name">বাজার দর</span>
            <span className="brand-date">{banglaDate}</span>
          </span>
        </Link>
        <div className="header-actions">
          {isPending ? (
            <span className="header-auth-skeleton" aria-label="লোড হচ্ছে" />
          ) : session?.user ? (
            <>
              <Link className="profile-link" href="/profile">
                <span className="avatar">{session.user.name?.slice(0, 1) || "👤"}</span>
                <span className="profile-name">{session.user.name || "প্রোফাইল"}</span>
              </Link>
              <button
                className="button button-outline header-button"
                onClick={handleSignOut}
                type="button"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="button button-outline header-button" href="/signin">
                সাইন ইন
              </Link>
              <Link className="button button-primary header-button" href="/signup">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="category-nav-wrap">
        <nav className="category-nav page-container" aria-label="পণ্যের বিভাগ">
          <Link className={`nav-link ${pathname === "/" ? "is-active" : ""}`} href="/">
            সব পণ্য
          </Link>
          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            return (
              <Link
                className={`nav-link ${pathname === href ? "is-active" : ""}`}
                href={href}
                key={category.slug}
              >
                <span aria-hidden="true">{category.icon}</span>
                {category.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
