import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-container">
        <div>
          <Link className="footer-brand" href="/">বাজার দর</Link>
          <p>প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <p className="footer-disclaimer">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
