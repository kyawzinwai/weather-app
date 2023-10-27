import React from "react";
import { useTranslation } from 'react-i18next';
import "../styles/weatherScreen.scss";
import { useSelector } from "react-redux";

function WeatherResult() {
  const { data, loading, error } = useSelector((state) => state.weather);
  const { t } = useTranslation();

  return (
    <>
      {loading && <p>{t("loading")}</p>}
      {error && <p className="txtError">{t("error", { error })}</p>}
      {data && (
        <div>
          <h3>{t("weatherInfo")}</h3>
          <p>{t("location", { location: data.location.name })}</p>
          <p>{t("temperature", { temperature: data.current.temperature })}</p>
        </div>
      )}
    </>
  );
}

export default WeatherResult;
