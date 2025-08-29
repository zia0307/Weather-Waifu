import React, { useState } from 'react';
import './App.css';//design stuff

//require('dotenv').config(); not required
const WEATHER_apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const WAIFU_apiKey = process.env.REACT_APP_WAIFU_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [waifu, setWaifu] = useState('rem');
  const [isTalking, setIsTalking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('EXAVITQu4vr4xnSDxMaL');
  const [darkMode, setDarkMode] = useState(false);


  const waifuImages = {
    rem: `${process.env.PUBLIC_URL}/waifus/rem.png`,
    zero_two: `${process.env.PUBLIC_URL}/waifus/zero_two.png`,
    marin: `${process.env.PUBLIC_URL}/waifus/marin.webp`,
    mikasa: `${process.env.PUBLIC_URL}/waifus/mikasa.png`,
    march7th: `${process.env.PUBLIC_URL}/waifus/marchseventh.png`,
    momo: `${process.env.PUBLIC_URL}/waifus/momo.png`,
    lucy: `${process.env.PUBLIC_URL}/waifus/lucy.png`,
    aihoshino: `${process.env.PUBLIC_URL}/waifus/aihoshino.webp`,
    ruka: `${process.env.PUBLIC_URL}/waifus/ruka.png`,
    twoB: `${process.env.PUBLIC_URL}/waifus/2B.webp`,
    yor: `${process.env.PUBLIC_URL}/waifus/yor.webp`,
    kaori: `${process.env.PUBLIC_URL}/waifus/kaori.webp`,
    asuna: `${process.env.PUBLIC_URL}/waifus/asuna.png`
  };

  const elevenLabsVoices = [
    { id: 'EXAVITQu4vr4xnSDxMaL', label: 'Rachel (Warm/Anime)' },
    { id: 'zrHiDhphv9ZnVXBqCLjz', label: 'Mimi (Cute/Sweet)' },
    { id: 'MF3mGyEYCl7XYWbV9V6O', label: 'Bella (Calm/Friendly)' },
    { id: '21m00Tcm4TlvDq8ikWAM', label: 'Emily (Sharp/Teen)' },
    { id: 'AZnzlk1XvdvUeBnXmlld', label: 'Elli (Soft/Sweet)' },
    { id: 'piTKgcLEGmPE4e6mEKli', label: 'Nicole (Deep/Raspy)'},
    { id: 'cgSgspJ2msm6clMCkdW9', label: 'Jessica (Cheerful/Happy)'}
  ];

  const getWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          const temp = data.main.temp;
          const desc = data.weather[0].description;
          const message = `Hey, there! In ${city}, it's ${temp} degrees Celsius with ${desc}. Have a great day!`;

          setIsTalking(true);

          fetch("https://api.elevenlabs.io/v1/text-to-speech/" + selectedVoice, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": WAIFU_apiKey
            },
            body: JSON.stringify({
              text: message,
              model_id: "eleven_monolingual_v1",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.8
              }
            })
          })
            .then(res => res.blob())
            .then(blob => {
              const audioUrl = URL.createObjectURL(blob);
              const audio = new Audio(audioUrl);
              audio.play();
              audio.onended = () => setIsTalking(false);
              audio.onerror = (err) => console.error("Audio error:", err);
            })
            .catch(err => {
              console.error("Failed to fetch audio:", err);
              setIsTalking(false);
            });

          setWeather({ temp, desc });
        } else {
          setWeather({ error: 'Are you sure this city exists...' });
        }
      })
      .catch(error => console.error("Error fetching weather:", error));
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>🌸 Weather Waifuへようこそ！ 🌸</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <br /><br />

      <label>Select your Waifu: </label>
      <select value={waifu} onChange={(e) => setWaifu(e.target.value)}>
        {Object.keys(waifuImages).map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <br /><br />

      <label>Select Voice: </label>
      <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
        {elevenLabsVoices.map((voice) => (
          <option key={voice.id} value={voice.id}>{voice.label}</option>
        ))}
      </select>

      <br /><br />

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Get Weather</button>

      <div className="waifu-image">
        <img
          src={waifuImages[waifu]}
          alt="waifu"
          className={isTalking ? 'talking' : ''}
        />
      </div>

      {weather && !weather.error && (
        <div>
          <h3>Temperature: {weather.temp}°C</h3>
          <p>Description: {weather.desc}</p>
        </div>
      )}

      {weather && weather.error && <p>{weather.error}</p>}

      <div className="credit">
        このアイデアをくれたNandanに感謝します! :D
      </div>
    </div>
  );
}

export default App;
