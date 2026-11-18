import { itemLabel, vnd } from '../format.js';

export default function CartSummary({ count, total }) {
  return (
    <aside className="cart" aria-label="Cart">
      <h2>Cart</h2>
      <p>{itemLabel(count)}</p>
      <p className="total">{vnd(total)}</p>
    </aside>
  );
}
