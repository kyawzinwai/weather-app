import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetData } from "./redux/slices/weatherSlice";
import { fetchWeather } from "./redux/actions/weather";
import { useTranslation } from 'react-i18next';
import CommonButton from "./components/elements/CommonButton";
import WeatherResult from "./components/WeatherResult";
import FaqSection from "./components/FaqSection";
import ZipCodeModal from "./components/ZipcodeModal";
import LanguageSwitchButton from "./components/LanguageSwitchButton";
import "./styles/weatherScreen.scss";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.weather);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleZipCodeSubmit = (zipCode) => {
    dispatch(resetData());
    dispatch(fetchWeather(zipCode));
    closeModal();
  };

  return (
    <div className="App">
      <div className="screenContainer">
        <LanguageSwitchButton />
        <h2>{t('app.title')}</h2>
        <CommonButton loading={loading} className={"btnEnterZipCode"} text={t("enterZipCodeButton")} onClick={openModal} />
        <WeatherResult />
        <FaqSection />
      </div>
      <ZipCodeModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onZipCodeSubmit={handleZipCodeSubmit}
      />
    </div>
  );
}

export default App;
