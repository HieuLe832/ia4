import { itemLabel, vnd } from '../format.js';

export default function CartSummary({ count, total, children }) {
  return (
    <aside className="card" aria-label="Cart">
      <div className="card-body">
        <h2 className="card-title h5">Cart</h2>
        <p className="mb-1">{itemLabel(count)}</p>
        <p className="fw-bold">{vnd(total)}</p>
        {children}
      </div>
    </aside>
  );
}
