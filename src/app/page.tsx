import Link from "next/link";
import { MarketVisual } from "@/components/market-visual";
import { PriceTicker } from "@/components/price-ticker";
import { ProductCard } from "@/components/product-card";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <PriceTicker products={products} />
      <section className="hero-section">
        <div className="hero-inner page-container">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> আপনার প্রতিদিনের বাজার সহযোগী</p>
            <h1>বাজারের সঠিক দাম,<br /><span>এখন হাতের মুঠোয়</span></h1>
            <p className="hero-description">
              চাল, ডাল, মাছ কিংবা সবজি—আপনার প্রতিদিনের প্রয়োজনীয় পণ্যের
              হালনাগাদ দাম জানুন এক জায়গায়।
            </p>
            <div className="hero-actions">
              <a className="button button-primary hero-cta" href="#সব-পণ্য">
                সব পণ্যের দাম দেখুন <span aria-hidden="true">→</span>
              </a>
              <p className="hero-trust"><span aria-hidden="true">✓</span> প্রতিদিনের বাজারদর, সহজে ও নির্ভরযোগ্যভাবে</p>
            </div>
            <div className="hero-stats">
              <div><strong>৩৩+</strong><span>নিত্যপ্রয়োজনীয় পণ্য</span></div>
              <span className="stat-divider" />
              <div><strong>১২+</strong><span>বাজারের তুলনামূলক দাম</span></div>
              <span className="stat-divider" />
              <div><strong>৮</strong><span>পণ্যের বিভাগ</span></div>
            </div>
          </div>
          <MarketVisual />
        </div>
      </section>

      <div className="page-container home-content">
        <section className="market-movement-section" aria-labelledby="risers-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">আজকের বাজার</p>
              <h2 id="risers-title">আজ দাম বেড়েছে <span className="rise-text">▲</span></h2>
              <p className="section-description">যেসব পণ্যের দাম আজ কিছুটা ঊর্ধ্বমুখী</p>
            </div>
            <span className="movement-icon movement-up" aria-hidden="true">↗</span>
          </div>
          {risers.length ? (
            <div className="product-grid movement-grid">
              {risers.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <p className="empty-note">আজ দাম বেড়েছে এমন কোনো পণ্য নেই।</p>
          )}
        </section>

        <section className="market-movement-section" aria-labelledby="fallers-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">স্বস্তির খবর</p>
              <h2 id="fallers-title">আজ দাম কমেছে <span className="fall-text">▼</span></h2>
              <p className="section-description">আজকের বাজারে যেসব পণ্যের দাম কমেছে</p>
            </div>
            <span className="movement-icon movement-down" aria-hidden="true">↘</span>
          </div>
          {fallers.length ? (
            <div className="product-grid movement-grid">
              {fallers.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <p className="empty-note">আজ দাম কমেছে এমন কোনো পণ্য নেই।</p>
          )}
        </section>

        <section className="all-products-section" id="সব-পণ্য" aria-labelledby="all-products-title">
          <div className="section-heading all-products-heading">
            <div>
              <p className="eyebrow">এক জায়গায় সব তথ্য</p>
              <h2 id="all-products-title">সব পণ্য</h2>
              <p className="section-description">আপনার নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর</p>
            </div>
            <span className="product-count">{products.length}টি পণ্য</span>
          </div>
          <ProductGrid products={products} />
          <div className="category-prompt">
            <span>পণ্য অনুযায়ী দাম দেখতে চান?</span>
            <Link href="/category/chal">সব বিভাগ দেখুন <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </div>
    </>
  );
}
