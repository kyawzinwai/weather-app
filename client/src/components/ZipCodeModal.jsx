import React, { useState } from "react";
import Modal from "react-modal";
import { useTranslation } from 'react-i18next';
import "../styles/zipcodeModal.scss";
import CommonButton from "./elements/CommonButton";

Modal.setAppElement("#root");

function ZipCodeModal({ isOpen, onRequestClose, onZipCodeSubmit }) {
  const { t } = useTranslation();
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
      <h3>{t('zipcodeModal.enterZipCode')}</h3>
      <form onSubmit={handleSubmit}>
        <div className="inputGroupAppend">
          <span className="inputHelperTxt">{t('zipcodeModal.inputHelperTxt')}</span>
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
          placeholder={t('zipcodeModal.zipCodePlaceholder')}
        />
        <CommonButton text={t('zipcodeModal.submitBtn')} className={"btnSubmit"} type="submit" />
      </form>
    </Modal>
  );
}

export default ZipCodeModal;
