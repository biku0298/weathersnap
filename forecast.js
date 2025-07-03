const button1 = document.getElementById("search-button");
const input1 = document.getElementById("city-input");
const cityForecast = document.getElementById("weather-forecast");

async function getData(city) {
  const promise = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d6b8812b8c124eb2bbc63826250207&q=${city}&days=5&aqi=no&alerts=no`
  );
  return await promise.json();
}

button1.addEventListener("click", async () => {
  const value = input1.value;
  const result = await getData(value);
  const forecastArray = result.forecast.forecastday;

  let html = `<h2>5-Day Weather Forecast for ${result.location.name}, ${result.location.country}</h2><div class="forecast-grid">`;

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
});
