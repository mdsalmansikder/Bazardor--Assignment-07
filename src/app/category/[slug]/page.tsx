import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { getCategories, getProducts } from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  return { title: category ? `${category.nameBn} পণ্যের দাম` : "বিভাগ খুঁজে পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category || products.length === 0) notFound();

  return (
    <section className="page-container category-page">
      <div className="breadcrumb">
        <Link href="/">হোম</Link><span aria-hidden="true">/</span><span>{category.nameBn}</span>
      </div>
      <div className="category-banner">
        <div className="category-banner-icon" aria-hidden="true">{category.icon}</div>
        <div>
          <p className="eyebrow">বিভাগ অনুযায়ী বাজারদর</p>
          <h1>{category.nameBn} পণ্যের দাম</h1>
          <p>{category.nameBn} বিভাগের {products.length}টি পণ্যের আজকের দাম ও বাজারের হালনাগাদ।</p>
        </div>
      </div>
      <div className="section-heading category-list-heading">
        <div>
          <h2>আজকের {category.nameBn}</h2>
          <p className="section-description">দাম কম-বেশি অনুযায়ী সাজিয়ে দেখুন</p>
        </div>
        <span className="product-count">{products.length}টি পণ্য</span>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
