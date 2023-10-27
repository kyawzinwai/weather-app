import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, resetData } from "./store/weatherSlice";
import ZipCodeModal from "./components/ZipCodeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

import "./styles/WeatherScreen.scss";
import faqData from "./mock/FAQ";

function App() {
  const noData = "No data to calculate. Please get the weather data by entering the zipcode.";
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    let rainingMessage, sunscreenMessage, windMessage;
    if (data != null) {
      const isRaining = data?.current?.weather_descriptions[0]
        ?.toLowerCase()
        .includes("rain");
      const isThunderstorm = data?.current?.weather_descriptions[0]
        ?.toLowerCase()
        .includes("thunderstorm");
      rainingMessage = isRaining || isThunderstorm
        ? `No, you shouldn't. It's ${data?.current?.weather_descriptions[0]} outside.`
        : `Yes, you can. It's not rain. The weather is ${data?.current?.weather_descriptions[0]} outside.`;

      sunscreenMessage =
        data?.current?.uv_index > 3
          ? "Yes, you should wear sunscreen."
          : "No, you don't have to. The UV index is a bit low right now.";

      windMessage = (!isRaining &&
        data?.current?.wind_speed > 15)
          ? "Yes, your kite will fly high."
          : "No, the wind speed is getting low.";
    } else {
      rainingMessage = sunscreenMessage = windMessage = noData;
    }
    setAnswers([rainingMessage, sunscreenMessage, windMessage]);
  }, [data]);

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

  const toggleAnswer = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <div className="App">
      <div className="screenContainer">
        <h2>Weather App</h2>
        <button
          disabled={loading}
          className="btnEnterZipCode"
          onClick={openModal}
        >
          Enter ZIP Code
        </button>
        {loading && <p>Loading...</p>}
        {error && <p className="txtError">Error: {error}</p>}
        {data && (
          <div>
            <h3>Weather Information</h3>
            <p>Location: {data.location.name}</p>
            <p>Temperature: {data.current.temperature}°C</p>
          </div>
        )}
        <div className="faqContainer">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="faqItem"
              id={`faqItem-${index}`}
              onClick={() => toggleAnswer(index)}
            >
              <div className="faqQuestion">
                {item.question}
                <span className="arrow">
                  {expandedItems.includes(index) ? (
                    <FontAwesomeIcon icon={faMinusSquare} />
                  ) : (
                    <FontAwesomeIcon icon={faPlusSquare} />
                  )}
                </span>
              </div>
              <div
                className={`faqAnswer ${
                  expandedItems.includes(index) ? "active" : ""
                }`}
              >
                {answers[index]}
              </div>
            </div>
          ))}
        </div>
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
