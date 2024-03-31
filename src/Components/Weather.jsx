import React, { useState, useEffect } from "react";
import WeatherForecast from "./WeatherForecast";
import clearSkyVideo from '../assets/Weather-Backgrounds/clear-sky.mp4';
import fewCloudsVideo from '../assets/Weather-Backgrounds/fewclouds.mp4';
import scatteredCloudsVideo from '../assets/Weather-Backgrounds/scattered-clouds.mp4';
import brokenCloudsVideo from '../assets/Weather-Backgrounds/borkenclouds.mp4';
import showerRainVideo from '../assets/Weather-Backgrounds/shower-rain.mp4';
import rainVideo from '../assets/Weather-Backgrounds/raining.mp4';
import thunderstormVideo from '../assets/Weather-Backgrounds/thunderstorm.mp4';
import snowVideo from '../assets/Weather-Backgrounds/snow.mp4';
import mistVideo from '../assets/Weather-Backgrounds/mist.mp4';
import "./styles.css"

function Weather() {
  const [city, setCity] = useState("paris");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e0359603f0a1d43bc120cab4d8fd705`;
      const response = await fetch(url);
      const data = await response.json();
      setDescription(data.weather[0].description);
      setTemperature((parseFloat(data.main.temp) - 273.15).toFixed(2));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []); // Empty dependency array for initial load

  useEffect(() => {
    const videos = {
      'clear sky': clearSkyVideo,
      'few clouds': fewCloudsVideo,
      'scattered clouds': scatteredCloudsVideo,
      'broken clouds': brokenCloudsVideo,
      'shower rain': showerRainVideo,
      'light rain' : rainVideo,
      'thunderstorm': thunderstormVideo,
      'snow': snowVideo,
      'mist': mistVideo,
      'overcast clouds': showerRainVideo
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
        {videoUrl ? (
          <source src={videoUrl} type="video/mp4" />
        ) : null}
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white  ">
        <div className="flex justify-center items-center">
          <div className="flex items-center max-w-md mx-auto rounded-lg absolute top-5 z-100" x-data="{ search: '' }">
            <div className="w-full">
              <input type="text" placeholder="Enter city name..." className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <button onClick={handleSearch} type="submit" className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="  mx-auto text-left z-10  absolute top-24 currentWeatherText">
          <h2 className="font-bold text-4xl z-10">{city}</h2>
          <h1 className="text-9xl z-10">{temperature}&deg; C</h1>
          <h1 className="text-3xl z-10">{description}</h1>
          <WeatherForecast city={city} />
        </div>
      </div>
    </div>
  );
}

export default Weather;
