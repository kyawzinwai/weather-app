import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/weatherScreen.scss";
import CommonButton from "./elements/CommonButton";

function LanguageSwitchButton() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="languageSwitch">
      <div className="langSwitchBtnWrapper">
        <CommonButton className={"btnLangSwitch"} text={'English'} onClick={() => changeLanguage("en")} />
      </div>
      <div>
        <CommonButton className={"btnLangSwitch"} text={'Tiếng Việt'} onClick={() => changeLanguage("vi")} />
      </div>
    </div>
  );
}

export default LanguageSwitchButton;
