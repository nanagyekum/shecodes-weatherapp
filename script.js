function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let currentDateElement = document.querySelector("#current-date");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  currentDateElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function formatDate(date) {
  let minuets = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minuets < 10) {
    minuets = `0${minuets}`;
  }

  return `${day} ${hours}: ${minuets}`;
}

function searchCity(city) {
  //seperation of concern
  let apiKey = "62db4c82b240e331f9t9o704cace6a7f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  //make api update UI
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast">
        <div class="weather-date">${day}</div>
        <div class="weather-icon">🌥</div>
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">
            <strong> 18° </strong>
          </span>
          <span class="weather-forecast-temp-min">12°</span>
        </div>
      </div>
    </div>
  </div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Accra");

displayForecast();
