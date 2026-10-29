import { formatBengaliNumber } from "@/lib/format";
import type { Product } from "@/lib/products";

function TickerItem({ product }: { product: Product }) {
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";
  return (
    <span className="ticker-item">
      <span aria-hidden="true">{product.image || product.categoryIcon}</span>
      <strong>{product.nameBn}</strong>
      <span>{formatBengaliNumber(product.today)} টাকা/{product.unit}</span>
      <span className={isFlat ? "ticker-flat" : isDown ? "ticker-down" : "ticker-up"}>
        {isFlat ? "— ০.০%" : `${isDown ? "▼" : "▲"} ${formatBengaliNumber(Math.abs(product.change.pct))}%`}
      </span>
    </span>
  );
}

export function PriceTicker({ products }: { products: Product[] }) {
  return (
    <div className="ticker" aria-label="আজকের বাজারদরের হালনাগাদ">
      <div className="ticker-track">
        {[...products, ...products].map((product, index) => (
          <TickerItem key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}
