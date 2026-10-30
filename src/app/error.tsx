"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("BazarDor page failed to load:", error);
  }, [error]);

  return (
    <section className="message-page page-container">
      <span className="message-icon" aria-hidden="true">⚠️</span>
      <h1>এই মুহূর্তে তথ্য দেখানো যাচ্ছে না</h1>
      <p>সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।</p>
      <div className="message-actions">
        <button className="button button-primary" onClick={reset} type="button">
          আবার চেষ্টা করুন
        </button>
        <Link className="button button-outline" href="/">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
