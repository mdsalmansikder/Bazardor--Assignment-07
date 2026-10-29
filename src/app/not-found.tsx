import Link from "next/link";

export default function NotFound() {
  return (
    <section className="message-page page-container">
      <span className="message-icon">🔎</span>
      <p className="eyebrow">৪০৪ — পাতা খুঁজে পাওয়া যায়নি</p>
      <h1>এই বাজারের ঠিকানা আমাদের জানা নেই</h1>
      <p>লিংকটি ভুল হতে পারে, অথবা পণ্যটি সরিয়ে নেওয়া হয়েছে।</p>
      <Link className="button button-primary" href="/">হোম পেজে ফিরে যান</Link>
    </section>
  );
}
