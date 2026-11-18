export default function SearchBox({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="search-products">Search products</label>
      <input
        id="search-products"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
