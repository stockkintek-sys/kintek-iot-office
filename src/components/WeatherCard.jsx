import { useEffect, useState } from "react";

export default function WeatherCard() {
  const [weather, setWeather] = useState({
    city: "Loading...",
    condition: "",
    temp: "",
    humidity: "",
    wind: "",
    icon: "",
  });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const city = "Phnom Penh"; // You can change or make it dynamic
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.main) {
          setWeather({
            city: data.name,
            condition: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          });
        }
      })
      .catch((err) => console.error("Weather error:", err));
  }, []);

  return (
    <div className="weather-card">
      <h2>📍 {weather.city}</h2>
      <div className="weather-info">
        <img src={weather.icon} alt="weather" className="weather-icon" />
        <div className="weather-details">
          <p>Condition: {weather.condition}</p>
          <p>Temperature: {weather.temp} °C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind} km/h</p>
        </div>
      </div>
    </div>
  );
}
