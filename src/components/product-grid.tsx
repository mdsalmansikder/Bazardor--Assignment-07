"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

type SortOrder = "default" | "asc" | "desc";

export function ProductGrid({ products }: { products: Product[] }) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") return products;
    return [...products].sort((a, b) =>
      sortOrder === "asc" ? a.today - b.today : b.today - a.today,
    );
  }, [products, sortOrder]);

  return (
    <>
      <div className="sort-control">
        <label htmlFor="product-sort">সাজান</label>
        <select
          id="product-sort"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <span className="sort-chevron" aria-hidden="true">⌄</span>
      </div>
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
