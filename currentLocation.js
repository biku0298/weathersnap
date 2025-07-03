const locationButton = document.getElementById("location-button");



async function getCurrentData(lat,long) {
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=d6b8812b8c124eb2bbc63826250207&q=${lat},${long}&aqi=no`);
    return await promise.json();
  };

async function gotLocation(position) {
    const liveResult = await getCurrentData(position.coords.latitude, position.coords.longitude);
   
    cityName.innerText = `${liveResult.location.name}, ${liveResult.location.region}, ${liveResult.location.country}`;
    cityTime.innerText = `Local Time: ${liveResult.location.localtime}`;
    cityTemp.innerText = `Temperature: ${liveResult.current.temp_c} °C`;
    
};

function noResult() {
    console.log("Failed to get result");
};

locationButton.addEventListener('click', async() => {
    const currentPosition = navigator.geolocation.getCurrentPosition(
      gotLocation,
      noResult
    );
})