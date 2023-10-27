import React from "react";
import "../../styles/weatherScreen.scss";

function CommonButton({ loading=false, text, className, onClick, type='button' }) {
  return (
    <button disabled={loading} type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default CommonButton;
