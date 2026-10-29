export default function ProductLoading() {
  return (
    <section className="page-container loading-page" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      <div className="skeleton skeleton-detail" />
      <div className="skeleton-heading skeleton" />
      <div className="price-summary-grid">
        {Array.from({ length: 3 }, (_, index) => (
          <div className="skeleton skeleton-summary" key={index} />
        ))}
      </div>
    </section>
  );
}
