import { useState } from 'react';
import { itemLabel, vnd } from '../format.js';

const NAME_ERROR = 'Enter your name.';
const PHONE_ERROR = 'Enter a 10-digit phone number starting with 0.';
const CART_ERROR = 'Add something to the cart first.';

export default function CheckoutForm({ count, total, onPlaced }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [tried, setTried] = useState(false);
  const [placed, setPlaced] = useState('');

  // The errors are worked out from the fields on every render — no second copy
  // of state kept in sync by an effect (F2).
  const nameError = name.trim() === '' ? NAME_ERROR : '';
  const phoneError = /^0\d{9}$/.test(phone) ? '' : PHONE_ERROR;

  const showNameError = tried && nameError !== '';
  const showPhoneError = tried && phoneError !== '';
  const showCartError = tried && count === 0 && placed === '';

  const handleSubmit = (event) => {
    event.preventDefault(); // F1: never reload, never put the fields in the URL
    setTried(true);
    setPlaced('');

    if (nameError !== '' || phoneError !== '') return;
    if (count === 0) return;

    setPlaced(`Order placed for ${name.trim()}: ${itemLabel(count)}, ${vnd(total)}.`);
    setName('');
    setPhone('');
    setNote('');
    setTried(false);
    onPlaced();
  };

  return (
    <form className="checkout" aria-label="Checkout" onSubmit={handleSubmit}>
      <h3>Checkout</h3>

      <div className="field">
        <label htmlFor="checkout-name">Name</label>
        <input
          id="checkout-name"
          type="text"
          value={name}
          aria-invalid={showNameError ? 'true' : undefined}
          aria-describedby={showNameError ? 'checkout-name-error' : undefined}
          onChange={(event) => setName(event.target.value)}
        />
        {showNameError && (
          <p className="field-error" id="checkout-name-error">
            {nameError}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="checkout-phone">Phone</label>
        <input
          id="checkout-phone"
          type="tel"
          value={phone}
          aria-invalid={showPhoneError ? 'true' : undefined}
          aria-describedby={showPhoneError ? 'checkout-phone-error' : undefined}
          onChange={(event) => setPhone(event.target.value)}
        />
        {showPhoneError && (
          <p className="field-error" id="checkout-phone-error">
            {phoneError}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="checkout-note">Note (optional)</label>
        <textarea
          id="checkout-note"
          maxLength={200}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <p className="counter">{note.length}/200</p>
      </div>

      <button type="submit">Place order</button>

      {showCartError && <p className="form-error">{CART_ERROR}</p>}
      {placed !== '' && <p className="confirmation">{placed}</p>}
    </form>
  );
}
