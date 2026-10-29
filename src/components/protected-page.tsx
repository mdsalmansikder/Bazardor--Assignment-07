"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/components/toast-provider";

export function ProtectedPage({
  children,
  redirectTo = "/profile",
}: {
  children: ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast("এই পৃষ্ঠাটি দেখতে আগে সাইন ইন করুন।", "error");
      router.replace(`/signin?next=${encodeURIComponent(redirectTo)}`);
    }
  }, [isPending, redirectTo, router, session, toast]);

  if (isPending || !session?.user) {
    return (
      <section className="page-container protected-loading" aria-label="সেশন যাচাই হচ্ছে">
        <div className="skeleton skeleton-detail" />
      </section>
    );
  }

  return children;
}
