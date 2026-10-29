export function MarketVisual() {
  return (
    <div className="market-visual" aria-label="বাজারের তাজা পণ্য">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="market-basket">
        <span className="basket-sun" />
        <span className="basket-produce produce-rice">🍚</span>
        <span className="basket-produce produce-fish">🐟</span>
        <span className="basket-produce produce-pepper">🌶️</span>
        <span className="basket-produce produce-egg">🥚</span>
        <span className="basket-produce produce-greens">🥬</span>
        <span className="basket-produce produce-onion">🧅</span>
        <div className="basket-handle" />
        <div className="basket-base" />
      </div>
      <div className="visual-price-card">
        <span className="visual-price-icon">↗</span>
        <span><strong>বাজারের সঠিক দাম</strong><small>প্রতিদিন আপডেট</small></span>
      </div>
      <div className="visual-fresh-label"><span /> বাজারের তাজা খবর</div>
    </div>
  );
}
