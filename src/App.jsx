import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./store/weatherSlice";
import ZipCodeModal from "./components/ZipCodeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import "./styles/WeatherScreen.css";
import faqData from "./mock/FAQ"; // Import faqData as a default export

function App() {
  const noData =
    "No data to calculate. Please get the weather data by entering the zipcode.";
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.weather);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]); // Track expanded FAQ items
  const [answers, setAnswers] = useState([]); // Track expanded FAQ items

  useEffect(() => {
    let rainingMessage, sunscreenMessage, windMessage;
    if (data != null) {
      const isRaining = data?.current?.weather_descriptions[0]
        ?.toLowerCase()
        .includes("rain");
      rainingMessage = isRaining
        ? "No, you shouldn't it's raining outside."
        : `Yes, it's not rain but the weather is ${data?.current?.weather_descriptions[0]} outside.`;

      sunscreenMessage =
        data?.current?.uv_index > 3
          ? "Yes, you should wear sunscreen."
          : "No, you don't have to. The UV index is a bit low right now.";

      windMessage =
        data?.current?.wind_speed > 15
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
    dispatch(fetchWeather(zipCode));
    closeModal();
  };

  // const toggleAnswer = (index) => {
  //   const faqItem = document.getElementById(`faqItem-${index}`);
  //   console.log('Click', faqItem);
  //   faqItem.classList.toggle('active');
  // };
  const toggleAnswer = (index) => {
    if (expandedItems.includes(index)) {
      // Item is expanded, so collapse it
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      // Item is collapsed, so expand it
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <div className="App">
      <div className="screenContainer">
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
            <h2>Weather Information</h2>
            <div>
              {data.current.weather_icons &&
                data.current.weather_icons.length > 0 && (
                  <img
                    src={data.current.weather_icons[0]}
                    alt={data.current.weather_descriptions[0]}
                    className="weather-icon"
                  />
                )}
              <p>{data?.current?.weather_descriptions[0]}</p>
            </div>
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
                    // Arrow-up icon when item is expanded
                    <FontAwesomeIcon icon={faMinusSquare} />
                  ) : (
                    // Arrow-down icon when item is collapsed
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
