import React, { useState, useEffect } from "react";
import WeatherForecast from "./WeatherForecast";
import clearSkyVideo from "../assets/Weather-Backgrounds/clear-sky.mp4";
import fewCloudsVideo from "../assets/Weather-Backgrounds/fewclouds.mp4";
import scatteredCloudsVideo from "../assets/Weather-Backgrounds/scattered-clouds.mp4";
import brokenCloudsVideo from "../assets/Weather-Backgrounds/borkenclouds.mp4";
import showerRainVideo from "../assets/Weather-Backgrounds/shower-rain.mp4";
import rainVideo from "../assets/Weather-Backgrounds/raining.mp4";
import thunderstormVideo from "../assets/Weather-Backgrounds/thunderstorm.mp4";
import snowVideo from "../assets/Weather-Backgrounds/snow.mp4";
import mistVideo from "../assets/Weather-Backgrounds/mist.mp4";
import "./styles.css";
import sunriseimg from "../assets/Weather-Icons/sunrise.png";
import sunsetimg from "../assets/Weather-Icons/sunset.png";

import wind from "../assets/Weather-Icons/wind.png";
import humid from "../assets/Weather-Icons/humidity.png";
import SearchBar from "./Searchbar";

function Weather() {
  const [city, setCity] = useState("dubai");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [windspeed, Setwindspeed] = useState("");
  const [Humidity, setHumidity] = useState("");
  const [inputValue, setInputValue] = useState("");
const [sunrise, setSunrise] = useState("");
const [sunset, setSunset] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    setCity(inputValue);
    console.log("city " + city);
    handleSearch();

    // You can perform additional actions with the input value here
  };
  const handleRerender = () => {
    setRerender((prev) => !prev);
  };
  const handleSearch = async () => {
    try {
      console.log(city);
      // e.preventDefault(); // Prevent default form submission behavior
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e0359603f0a1d43bc120cab4d8fd705`;
      const response = await fetch(url);

      const data = await response.json();
      Setwindspeed(data.wind.speed);
      // Setwindspeed(data.)
      console.log(data);
      //  console.log(data.main.humidity + "%")
setSunrise(data.sys.sunrise);
setSunset(data.sys.sunset);

      setHumidity(data.main.humidity + "%");
      setDescription(data.weather[0].description);
      setTemperature((parseFloat(data.main.temp) - 273.15).toFixed(2));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, [city]); // Empty dependency array for initial load

  useEffect(() => {
    const videos = {
      "clear sky": clearSkyVideo,
      "few clouds": fewCloudsVideo,
      "scattered clouds": scatteredCloudsVideo,
      "broken clouds": brokenCloudsVideo,
      "shower rain": showerRainVideo,
      "light rain": rainVideo,
      thunderstorm: thunderstormVideo,
      snow: snowVideo,
      mist: mistVideo,
      "overcast clouds": clearSkyVideo, 
    };
    setVideoUrl(videos[description]);
  }, [description]);

  return (
    <div className="relative w-full h-screen weatherPage">
      <video
        autoPlay
        loop
        muted
        className="fixed inset-0 object-cover w-full h-full z-0"
      >
        {videoUrl ? <source src={videoUrl} type="video/mp4" /> : null}
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white  ">
        <div className="flex justify-center items-center">
          <div
            className="flex items-center max-w-md mx-auto rounded-lg absolute top-5 z-100"
            x-data="{ search: '' }"
          >
            <div className=" flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg rounded-r-none text-gray-800  focus:outline-none"
                placeholder="Enter any city"
              />

              <button
                onClick={handleSubmit}
                type="submit"
                className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <div></div>
            </div>
          </div>
        </div>

        <div className="  mx-auto text-left z-10  absolute top-24 currentWeatherText">
          <h2 className="font-bold text-4xl z-10">{city }</h2>
          <h1 className="text-9xl z-10">{temperature}&deg; C</h1>
          <h1 className="text-3xl z-10">{description}</h1>
<div id="sunbox-wrapper">
<div id="sun-box" >
          <img src={sunriseimg} alt="" />
          <h2>
            Sunrise <br />
            {new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </h2>

    </div>
    <div id="sun-box" >
          <img src={sunsetimg} alt="" />
          <h2>
            Sunset <br />
          {new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </h2>

    </div>
</div>

          <WeatherForecast city={city} />

          <div id="windhumidBoxes">
     
            <div className=" windSpeed bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
              <h5 className="  mb-3 text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Wind
              </h5>

              <img src={wind} alt="" />
              <h2 id="windtext" className="text-5xl">
                {windspeed}
                <span className="text-sm">mph</span>
              </h2>
            </div>
            <div className=" windSpeed bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
              <h5 className="  mb-3 text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                Humidity
              </h5>

              <img src={humid} alt="" />
              <h2 id="humidtext" className="text-5xl">
                {Humidity}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
