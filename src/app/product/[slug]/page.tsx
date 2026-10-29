import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProtectedPage } from "@/components/protected-page";
import { formatBengaliNumber, formatPrice, formatUnit } from "@/lib/format";
import { getProduct, getProducts } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product ? `${product.nameBn} — আজকের দাম` : "পণ্য খুঁজে পাওয়া যায়নি" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const prices = product.markets.flatMap((market) => [market.min, market.max]);
  const minPrice = prices.length ? Math.min(...prices) : product.today;
  const maxPrice = prices.length ? Math.max(...prices) : product.today;
  const averagePrice = prices.length
    ? Math.round(prices.reduce((total, price) => total + price, 0) / prices.length)
    : product.today;

  return (
    <ProtectedPage redirectTo={`/product/${product.slug}`}>
      <article className="page-container detail-page">
        <div className="breadcrumb">
          <Link href="/">হোম</Link><span aria-hidden="true">/</span>
          <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
          <span aria-hidden="true">/</span><span>{product.nameBn}</span>
        </div>

        <section className="detail-summary">
          <div className="detail-emoji" aria-hidden="true">{product.image || product.categoryIcon}</div>
          <div className="detail-copy">
            <div className="detail-tags">
              <span className="tag">{product.categoryIcon} {product.categoryNameBn}</span>
              <span className="tag">{formatUnit(product.unit)}</span>
            </div>
            <h1>{product.nameBn}</h1>
            <p>
              {product.nameBn} — {product.categoryNameBn} বিভাগের আজকের বাজারদর ও
              বিভিন্ন বাজারের দামের তুলনা।
            </p>
            <span className={`change-badge change-${product.change.dir}`}>
              {product.change.dir === "up"
                ? `▲ ${formatBengaliNumber(product.change.pct)}% আজ বেড়েছে`
                : product.change.dir === "down"
                  ? `▼ ${formatBengaliNumber(Math.abs(product.change.pct))}% আজ কমেছে`
                  : "— দাম অপরিবর্তিত"}
            </span>
          </div>
          <div className="detail-current-price">
            <span>আজকের গড় দাম</span>
            <strong>{formatPrice(product.today)}</strong>
            <small>{formatUnit(product.unit)}</small>
          </div>
        </section>

        <section className="price-summary-section">
          <div className="section-heading">
            <div><p className="eyebrow">আজকের হিসাব</p><h2>দামের সারসংক্ষেপ</h2></div>
          </div>
          <div className="price-summary-grid">
            <div className="summary-card summary-low"><span>সর্বনিম্ন দাম</span><strong>{formatPrice(minPrice)}</strong><small>বাজারে পাওয়া সর্বনিম্ন</small></div>
            <div className="summary-card summary-average"><span>গড় বাজারদর</span><strong>{formatPrice(averagePrice)}</strong><small>সব বাজারের গড়</small></div>
            <div className="summary-card summary-high"><span>সর্বোচ্চ দাম</span><strong>{formatPrice(maxPrice)}</strong><small>বাজারে পাওয়া সর্বোচ্চ</small></div>
          </div>
        </section>

        <section className="market-prices-section">
          <div className="section-heading">
            <div><p className="eyebrow">বাজারভিত্তিক আজকের দাম</p><h2>কোন বাজারে কত?</h2></div>
            <span className="product-count">{product.markets.length}টি বাজার</span>
          </div>
          <div className="market-table-wrap">
            <table className="market-table">
              <thead><tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th></tr></thead>
              <tbody>
                {product.markets.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <td><span className="market-name-icon" aria-hidden="true">📍</span>{market.market}</td>
                    <td>{market.division}</td>
                    <td>{formatPrice(market.min)}</td>
                    <td>{formatPrice(market.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="market-note">দাম বাজার ও সময়ভেদে পরিবর্তিত হতে পারে। কেনার আগে স্থানীয় বাজারে যাচাই করুন।</p>
        </section>
      </article>
    </ProtectedPage>
  );
}
