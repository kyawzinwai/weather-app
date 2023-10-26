import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/ZipCodeModal.css";

Modal.setAppElement("#root");

function ZipCodeModal({ isOpen, onRequestClose, onZipCodeSubmit }) {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onZipCodeSubmit(zipCode);
    setZipCode("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Zip Code Modal"
      className="modalContainer"
    >
      <h3>Enter ZIP Code</h3>
      <form onSubmit={handleSubmit}>
        <div class="input-group-append">
          <span class="inputHelperTxt">* Input only numbers</span>
        </div>
        <input
          autoFocus
          required
          className="inputZip"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="ZIP Code"
        />
        <button className="btnSubmit" type="submit">Submit</button>
      </form>
    </Modal>
  );
}

export default ZipCodeModal;
