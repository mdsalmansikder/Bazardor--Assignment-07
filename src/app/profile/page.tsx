"use client";

import Link from "next/link";
import { ProtectedPage } from "@/components/protected-page";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <ProtectedPage>
      <section className="page-container profile-page">
        <div className="breadcrumb"><Link href="/">হোম</Link><span aria-hidden="true">/</span><span>আমার প্রোফাইল</span></div>
        <div className="profile-card">
          <div className="profile-avatar">{user?.name?.slice(0, 1) || "👤"}</div>
          <p className="eyebrow">আপনার অ্যাকাউন্ট</p>
          <h1>আমার প্রোফাইল</h1>
          <div className="profile-details">
            <div><span>নাম</span><strong>{user?.name}</strong></div>
            <div><span>ইমেইল</span><strong>{user?.email}</strong></div>
          </div>
          <Link className="button button-primary" href="/profile/update">তথ্য পরিবর্তন করুন <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </ProtectedPage>
  );
}
