Weather Waifu App

Weather Waifu is a React-based application that delivers weather forecasts through an interactive anime-style character with text-to-speech narration.

Features
Real-time weather information for any location
Text-to-speech narration of weather reports
Selectable voices and characters for a customizable experience
Prerequisites
Node.js and npm
API keys for:
Weather service (OpenWeatherMap)
Text-to-speech service (ElevenLabs)
Getting Started
1. Clone the Repository
git clone https://github.com/zia0307/Weather-Waifu.git
cd WeatherWaifu
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file in the root directory and add your API keys:

REACT_APP_WEATHER_API_KEY=your_openweather_key
REACT_APP_TTS_API_KEY=your_elevenlabs_key
4. Start the Development Server
npm start

The application will be available at http://localhost:3000.

Tech Stack
React.js
Node.js
OpenWeatherMap API
ElevenLabs Text-to-Speech API
Notes
Ensure API keys are valid and properly configured
Do not expose your API keys in public repositories
