export default function CategoryLoading() {
  return (
    <section className="page-container loading-page" aria-label="বিভাগের পণ্য লোড হচ্ছে">
      <div className="skeleton skeleton-category-banner" />
      <div className="skeleton-heading skeleton" />
      <div className="product-grid">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="skeleton skeleton-card" key={index} />
        ))}
      </div>
    </section>
  );
}
