const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const errorMessage = document.getElementById("error-message");

async function getData(cityName) {
  const promise = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=d6b8812b8c124eb2bbc63826250207&q=${cityName}&aqi=no`
  );
  return await promise.json();
}

button.addEventListener("click", async () => {
  const value = input.value.trim();

  if (value === "") {
    errorMessage.textContent = "⚠️ Please enter a city name.";
    return;
  }

  try {
    const result = await getData(value);

    if (result.error) {
      cityName.innerText = "";
      cityTime.innerText = "";
      cityTemp.innerText = "";
      errorMessage.textContent =
        "❌ No such location found. Please try another city.";
      return;
    }

    errorMessage.textContent = ""; // Clear error

    const locationIcon = "📍";
    const tempIcon = "🌡️";
    const conditionIcon = ` <img src="https:${result.current.condition.icon}" alt="${result.current.condition.text}" style="width: 24px; vertical-align: middle;">`;

    cityName.innerHTML = `${locationIcon} ${result.location.name}, ${result.location.region}, ${result.location.country}`;
    cityTime.innerHTML = `<strong>Local Time:</strong> ${result.location.localtime}`;
    cityTemp.innerHTML = `<strong>${tempIcon} Temperature:</strong> ${result.current.temp_c} °C ${conditionIcon}`;
  } catch (err) {
    console.error(err);
    errorMessage.textContent = "❌ Something went wrong. Try again later.";
  }
});

