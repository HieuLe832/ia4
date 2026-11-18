import { useWishlist } from '../WishlistContext.jsx';

export default function SavedPanel() {
  const { saved } = useWishlist();

  return (
    <section className="saved" aria-label="Saved">
      <h2>Saved</h2>
      {saved.length === 0 ? (
        <p>Nothing saved yet.</p>
      ) : (
        // Names are text: "Scarf <i>limited</i>" shows its brackets (W3).
        <ul>
          {saved.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
