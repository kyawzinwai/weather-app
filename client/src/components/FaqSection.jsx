import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import faqData from "../mock/faq";
import "../styles/weatherScreen.scss";
import { useSelector } from "react-redux";

function FaqSection() {
  const { data } = useSelector((state) => state.weather);
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const noDataMessage = t('faq.noDataMessage');

  useEffect(() => {
    let rainingMessage, sunscreenMessage, windMessage;
    if (data != null) {
    const isRaining = data?.current?.weather_descriptions[0]?.toLowerCase().includes("rain");
    const isThunderstorm = data?.current?.weather_descriptions[0]?.toLowerCase().includes("thunderstorm");
    const weatherDescription = data?.current?.weather_descriptions[0];

    rainingMessage = isRaining || isThunderstorm
      ? t('faq.rainingMessage', { weatherDescription })
      : t('faq.rainingMessageAlt', { weatherDescription });

    sunscreenMessage = data?.current?.uv_index > 3
      ? t('faq.sunscreenMessage')
      : t('faq.sunscreenMessageAlt');

    windMessage = ((!isRaining && !isThunderstorm) && data?.current?.wind_speed > 15)
      ? t('faq.windMessage')
      : t('faq.windMessageAlt');
    } else {
      rainingMessage = sunscreenMessage = windMessage = noDataMessage;
    }
    setAnswers([rainingMessage, sunscreenMessage, windMessage]);
  }, [data, noDataMessage]);

  const toggleFaq = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <div className="faqContainer">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="faqItem"
          id={`faqItem-${index}`}
          onClick={() => toggleFaq(index)}
        >
          <div className="faqQuestion">
            {t(item.questionKey)}
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
  );
}

export default FaqSection;
