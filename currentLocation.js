const locationButton = document.getElementById("location-button");

const apiKey = "d6b8812b8c124eb2bbc63826250207"; 


async function getForecastData(lat, lon) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no&alerts=no`
  );
  return await response.json();
}

async function gotLocation(position) {
  try {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const result = await getForecastData(lat, lon);

 
    cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
    cityTime.innerText = `Local Time: ${result.location.localtime}`;
    cityTemp.innerHTML = `🌡️ Temperature: ${result.current.temp_c} °C <img src="https:${result.current.condition.icon}" alt="${result.current.condition.text}" style="width: 24px; vertical-align: middle;">`;

    
    const forecastArray = result.forecast.forecastday;

    let html = `<h2>5-Day Weather Forecast for ${result.location.name}</h2><div class="forecast-grid">`;

    forecastArray.forEach((day) => {
      html += `
        <div class="forecast-card">
          <h3>${day.date}</h3>
          <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
          <p><strong>${day.day.condition.text}</strong></p>
          <p>🌡️ Max: ${day.day.maxtemp_c} °C</p>
          <p>❄️ Min: ${day.day.mintemp_c} °C</p>
          <p>🌞 Sunrise: ${day.astro.sunrise}</p>
          <p>🌙 Sunset: ${day.astro.sunset}</p>
        </div>
      `;
    });

    html += `</div>`;
    cityForecast.innerHTML = html;
  } catch (err) {
    console.error("Failed to get location-based forecast", err);
    cityForecast.innerHTML =
      "<p style='color: red;'>❌ Could not load forecast for your location.</p>";
  }
}

function noResult() {
  console.log("Failed to get user location.");
}

locationButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotLocation, noResult);
});
