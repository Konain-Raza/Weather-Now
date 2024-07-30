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
import sunriseimg from "../assets/Weather-Icons/sunrise.png";
import sunsetimg from "../assets/Weather-Icons/sunset.png";
import wind from "../assets/Weather-Icons/wind.png";
import humid from "../assets/Weather-Icons/humidity.png";
import SearchBar from "./Searchbar";
import SplashScreen from "./SplashScreen";
import useStore from "./store";
import { toast } from 'react-toastify';
import "./styles.css";

function Weather() {
  const { city } = useStore((state) => ({
    city: state.city,
  }));

  const [cety, setCity] = useState(city || ""); 
  const [isError, setIsError] = useState(false); 
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState(clearSkyVideo); 
  const [windspeed, setWindspeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      setCity(city);
    }
  }, [city]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (description) {
      const videos = {
        "clear sky": clearSkyVideo,
        "few clouds": fewCloudsVideo,
        "scattered clouds": scatteredCloudsVideo,
        "broken clouds": brokenCloudsVideo,
        "shower rain": showerRainVideo,
        "light rain": rainVideo,
        "thunderstorm": thunderstormVideo,
        "snow": snowVideo,
        "mist": mistVideo,
        "overcast clouds": mistVideo,
        "moderate rain": showerRainVideo,
      };
      
      const normalizedDescription = description.toLowerCase();
      const video = videos[normalizedDescription] || clearSkyVideo;
      setVideoUrl(video);
    }
  }, [description]);

  const handleSearch = async () => {
    try {
      let url;

      if (cety && cety.trim() !== "") {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cety}&appid=1e0359603f0a1d43bc120cab4d8fd705`;
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1e0359603f0a1d43bc120cab4d8fd705`;

              try {
                const response = await fetch(url);
                if (response.ok) {
                  const data = await response.json();
                  setWindspeed(data.wind.speed);
                  setSunrise(data.sys.sunrise);
                  setSunset(data.sys.sunset);
                  setHumidity(data.main.humidity + "%");
                  setDescription(data.weather[0].description);
                  setTemperature((parseFloat(data.main.temp) - 273.15).toFixed(2));
                  setIsError(false);
                } else {
                  toast.error("Unable to fetch weather data.");
                  setIsError(true);
                }
              } catch (error) {
                toast.error("Error fetching weather data:", error);
                setIsError(true);
              }
            },
            (error) => {
              toast.error("Geolocation error: " + error.message);
              setIsError(true);
            }
          );
          return;
        } else {
          toast.error("Geolocation is not supported by this browser.");
          setIsError(true);
          return;
        }
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWindspeed(data.wind.speed);
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);
        setHumidity(data.main.humidity + "%");
        setDescription(data.weather[0].description);
        setTemperature((parseFloat(data.main.temp) - 273.15).toFixed(2));
        setIsError(false);
      } else {
        toast.error("City not found. Please enter a valid city.");
        setIsError(true);
      }
    } catch (error) {
      toast.error("Error fetching weather data:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [cety]);

  return (
    <div>
      {loading ? (
        <SplashScreen />
      ) : (
        <div id="bg-video" className="relative w-full h-screen weatherPage">
          <video
            autoPlay
            loop
            muted
            key={videoUrl}
            className="fixed inset-0 object-cover w-screen h-screen z-0"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50">
            <SearchBar />
            {isError ? (
              <p className="text-red-500">Error fetching weather data. Please try again.</p>
            ) : (
              <div className="mx-auto text-left z-10 absolute top-24 currentWeatherText">
               <div id="info-1">
               <h2 className="font-bold text-3xl z-10" >{cety}</h2>
                <h1 className="text-9xl z-10" id="cityname">{temperature}&deg; C</h1>
                <h1 className="text-3xl z-10" >{description}</h1>
                <div id="sunbox-wrapper">
                  <div id="sun-box">
                    <img src={sunriseimg} alt="Sunrise" />
                    <h2>
                      Sunrise <br />
                      {sunrise
                        ? new Date(sunrise * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </h2>
                  </div>
                  <div id="sun-box">
                    <img src={sunsetimg} alt="Sunset" />
                    <h2>
                      Sunset <br />
                      {sunset
                        ? new Date(sunset * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </h2>
                  </div>
                </div>
               </div>
                <WeatherForecast />
                <div id="windhumidBoxes">
                  <div className="windSpeed bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
                    <h5 className="mb-3 text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                      Wind
                    </h5>
                    <img src={wind} alt="Wind" />
                    <h2 id="windtext" className="text-5xl">
                      {windspeed}
                      <span className="text-sm"> mph</span>
                    </h2>
                  </div>
                  <div className="windSpeed bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
                    <h5 className="mb-3 text-4xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                      Humidity
                    </h5>
                    <img src={humid} alt="Humidity" />
                    <h2 id="humidtext" className="text-5xl">
                      {humidity}
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
