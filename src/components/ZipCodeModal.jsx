import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/ZipCodeModal.css";

Modal.setAppElement("#root");

function ZipCodeModal({ isOpen, onRequestClose, onZipCodeSubmit }) {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e) => {
    console.log("zipCode data ==> Inpu ", zipCode);
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
      <h2>Enter ZIP Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="ZIP Code"
        />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}

export default ZipCodeModal;
