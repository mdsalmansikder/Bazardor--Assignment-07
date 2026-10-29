import Link from "next/link";
import { formatPrice, formatUnit } from "@/lib/format";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const direction = product.change.dir;
  const changeLabel =
    direction === "up"
      ? `▲ ${product.change.pct}`
      : direction === "down"
        ? `▼ ${Math.abs(product.change.pct)}`
        : "— ০.০";

  return (
    <Link
      className="product-card"
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn}, ${formatPrice(product.today)} — বিস্তারিত দেখুন`}
    >
      <div className="product-card-top">
        <span className={`change-badge change-${direction}`}>
          {changeLabel}%
        </span>
        <span className="product-category">{product.categoryNameBn}</span>
      </div>
      <div className="product-illustration" aria-hidden="true">
        <span>{product.image || product.categoryIcon}</span>
      </div>
      <div className="product-card-content">
        <h3>{product.nameBn}</h3>
        <p className="product-unit">{formatUnit(product.unit)}</p>
        <div className="product-price-row">
          <span>আজকের দাম</span>
          <strong>{formatPrice(product.today)}</strong>
        </div>
      </div>
      <span className="product-card-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
