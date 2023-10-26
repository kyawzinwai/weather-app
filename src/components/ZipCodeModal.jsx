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
        <input
          autoFocus
          className="inputZip"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="ZIP Code"
        />
        <button disabled={zipCode.length < 5 ? true : false} className="btnSubmit" type="submit">Submit</button>
      </form>
    </Modal>
  );
}

export default ZipCodeModal;
