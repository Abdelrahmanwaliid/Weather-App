const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.querySelector("button");
const results = document.querySelector(".result");
const locationCity = document.querySelector(".city");
const locationDate = document.querySelector(".date");
const humidity = document.querySelector(".humidity_wind .humidity .text");
const wind = document.querySelector(".humidity_wind .wind .text");
const temp = document.querySelector(".weather-description .temp");
const weather = document.querySelector(".weather-description .weather");

async function weatherApp() {
  const city = searchInput.value;
  const accessKey = "33e573af35f7004725786b7ac34fbc27";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${accessKey}`;

  const response = await fetch(url);

  const data = await response.json();
  console.log(data);

  // City Div
  locationCity.innerHTML = `
  <i class="fa-solid fa-location-dot"></i>
  ${data.name}, ${data.sys.country}`;

  // date Div
  const dateAndTime = new Date();
  const month = dateAndTime.toLocaleString("en-EN", { month: "long" });
  const day = dateAndTime.toLocaleString("en-EN", { weekday: "long" });
  locationDate.innerHTML = `${day} ${dateAndTime.getDate()} ${month} ${dateAndTime.getFullYear()}`;

  // Temp Div
  temp.innerHTML = `${parseInt(data.main.temp)}<span>°c</span>`;

  // Weather Div
  weather.innerHTML = `${data.weather[0].description}`;

  // change background image
  if (data.weather[0].main === "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  } else if (data.weather[0].main === "Mist") {
    document.body.style.backgroundImage = "url('images/pink.jpg')";
  } else if (data.weather[0].main === "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  } else if (data.weather[0].main === "Clouds") {
    document.body.style.backgroundImage = "url('images/ii.jpg')";
  } else {
    document.body.style.backgroundImage = "";
  }

  // Humidity Div
  humidity.innerHTML = `<span>${data.main.humidity}%</span><p>Humidity</p>`;

  // Wind Div
  wind.innerHTML = `<span>${parseInt(
    data.wind.speed
  )}Km/h</span> <p>Wind Speed</p>`;

  // Add animation
  const locationSection = document.querySelector(".location");
  const weatherSection = document.querySelector(".weather-description");
  const humiditySection = document.querySelector(".humidity_wind");

  locationSection.classList.add("fadeIn");
  weatherSection.classList.add("fadeIn");
  humiditySection.classList.add("fadeIn");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value !== "") {
    results.style.display = "flex";
    weatherApp();
  }
});
