import { useWishlist } from '../WishlistContext.jsx';

export default function SavedPanel() {
  const { saved } = useWishlist();

  return (
    <section className="card mb-3" aria-label="Saved">
      <div className="card-body py-2">
        <h2 className="h6 card-title mb-2">Saved</h2>
        {saved.length === 0 ? (
          <p className="text-secondary mb-0">Nothing saved yet.</p>
        ) : (
          // Names are text: "Scarf <i>limited</i>" shows its brackets (W3).
          <ul className="mb-0 ps-3">
            {saved.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
