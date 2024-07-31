import React, { useState, useEffect } from "react";
import useStore from "./store";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

function WeatherForecast() {
  const {city}= useStore((state)=>(
    {city: state.city}
  ))
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const apiKey = "1e0359603f0a1d43bc120cab4d8fd705";
        let url;
  
        if (city && city.trim() !== "") {
          url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        } else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
                try {
                  const response = await fetch(url);
                  const data = await response.json();
                  setForecastData(data);
                } catch (error) {
                  setError("Error fetching forecast data");
                }
              },
              () => {
                setError("Geolocation is not supported or permission denied.");
              }
            );
          } else {
            setError("Geolocation is not supported by this browser.");
          }
          return;
        }
  
        const response = await fetch(url);
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        setError("Error fetching forecast data");
      }
    };
  
    fetchForecastData();
  }, [city]);
  
  

  return (
    
    <div className="text-white h-auto " id="forecastBox">
      <h1 className="text-5xl font-bold mb-5">Forecast</h1>
      {error && <p>{error}</p>}
      {forecastData && forecastData.list && (
        <Swiper spaceBetween={10} slidesPerView="auto" freeMode={true}>
          {forecastData.list.map((forecast, index) => {
            const date = new Date(forecast.dt_txt);
            const dateString = date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            });
            const timeString = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            });
            const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

            return (
              <SwiperSlide key={index} className="flex items-center">
                <div className="flex items-center justify-center flex-col font-bol w-40">
                  <div className="w-full">
                    <h2 className="font-bold text-sm text-white text-center">
                      {dateString} <br /> {timeString}
                    </h2>
                  </div>
                  <div className="border-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0 shadow-2xl w-28 h-48 rounded-full">
                    <div className="flex flex-col">
                      <div className="my-5">
                        <div className="flex flex-col justify-center items-center">
                          <div id="weather-icon" className="">
                            <img
                            
                              src={iconUrl}
                              alt="Weather Icon"
                            />
                          </div>
                          <div className="flex-col items-center">
                            <h4 className="text-2xl font-bold">
                              {(
                                parseFloat(forecast.main.temp) - 273.15
                              ).toFixed(2)}
                              &deg;C
                            </h4>
                       
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

export default WeatherForecast;
