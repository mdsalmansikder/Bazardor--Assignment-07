export default function HomeLoading() {
  return (
    <div className="page-container loading-page" aria-label="পণ্য লোড হচ্ছে">
      <div className="skeleton skeleton-hero" />
      <div className="skeleton-heading skeleton" />
      <div className="product-grid">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="skeleton skeleton-card" key={index} />
        ))}
      </div>
    </div>
  );
}
