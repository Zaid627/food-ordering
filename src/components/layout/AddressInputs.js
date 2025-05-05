export default function AddressInputs({ addressProps, setAddressProps, disabled=false }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        value={phone || ""}
        placeholder="phone number"
        onChange={(e) => setAddressProps("phone", e.target.value)}
      />
      <label>Street address</label>
      <input
        disabled={disabled}
        type="text"
        value={streetAddress || ""}
        placeholder="Street address"
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal Code</label>
          <input
          disabled={disabled}
            type="text"
            value={postalCode || ""}
            placeholder="Postal code"
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            value={city || ""}
            placeholder="City"
            onChange={(e) => setAddressProps("city", e.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        value={country || ""}
        placeholder="Country"
        onChange={(e) => setAddressProps("country", e.target.value)}
      />
    </>
  );
}
