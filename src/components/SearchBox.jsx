export default function SearchBox({ value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor="search-products">
        Search products
      </label>
      <input
        className="form-control"
        id="search-products"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
