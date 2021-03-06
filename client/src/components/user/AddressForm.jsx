import React from "react";

const AddressForm = ({ onChange, address }) => {
  return (
    <div className="address-form">
      <form>
        <div class="mb-3 form-group">
          <label for="city" class="form-label">
            City
          </label>
          <input
            type="text"
            class="form-control"
            name="city"
            id="city"
            placeholder="city"
            onChange={onChange}
            value={address.city}
          />
        </div>
        <div class="mb-3 form-group">
          <label for="address" class="form-label">
            Address Information
          </label>
          <textarea
            class="form-control"
            name="address"
            id="address"
            onChange={onChange}
            value={address.address}
            rows="3"></textarea>
        </div>
        <div class="mb-3 form-group">
          <label for="mobile" class="form-label">
            Phone Number
          </label>
          <input
            type="text"
            class="form-control"
            name="mobile"
            id="mobile"
            placeholder="mobile"
            onChange={onChange}
            value={address.mobile}
          />
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
