export type PriceChange = {
  dir: "up" | "down" | "flat";
  pct: number;
};

export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const API_BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Partial<Product>;
  return (
    typeof product.id === "number" &&
    typeof product.slug === "string" &&
    typeof product.nameBn === "string" &&
    typeof product.today === "number" &&
    !!product.change &&
    Array.isArray(product.markets)
  );
}

function isCategory(value: unknown): value is Category {
  if (!value || typeof value !== "object") return false;
  const category = value as Partial<Category>;
  return (
    typeof category.slug === "string" &&
    typeof category.nameBn === "string" &&
    typeof category.icon === "string"
  );
}

async function fetchApi<T>(
  path: string,
  isExpectedData: (data: unknown) => data is T,
): Promise<T> {
  const failures: string[] = [];

  for (const baseUrl of API_BASES) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: "force-cache",
      });

      if (!response.ok) {
        failures.push(`${baseUrl}: HTTP ${response.status}`);
        continue;
      }

      const data: unknown = await response.json();
      if (isExpectedData(data)) return data;

      failures.push(`${baseUrl}: unexpected response format`);
    } catch (error) {
      failures.push(
        `${baseUrl}: ${error instanceof Error ? error.message : "request failed"}`,
      );
    }
  }

  throw new Error(`Could not load BazarDor data. ${failures.join("; ")}`);
}

function isProductList(data: unknown): data is Product[] {
  return Array.isArray(data) && data.every(isProduct);
}

function isCategoryList(data: unknown): data is Category[] {
  return Array.isArray(data) && data.every(isCategory);
}

export function getProducts(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchApi(`/products${query}`, isProductList);
}

export function getCategories() {
  return fetchApi("/categories", isCategoryList);
}

export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}
