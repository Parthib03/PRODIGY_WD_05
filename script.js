const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const displayWeatherData = (json) => {
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  switch (json.weather[0].main) {
    case "Clear":
      image.src = "clear.png";
      document.body.style.backgroundImage = "url('clear.jpg')";
      break;
    case "Rain":
      image.src = "rain.png";
      document.body.style.backgroundImage = "url('rain.gif')";
      break;
    case "Snow":
      image.src = "snow.png";
      document.body.style.backgroundImage = "url('snow.gif')";
      break;
    case "Clouds":
      image.src = "cloud.png";
      document.body.style.backgroundImage = "url('cloudy.gif')";
      break;
    case "Mist":
    case "Haze":
      image.src = "mist.png";
      document.body.style.backgroundImage = "url('mist.gif')";
      break;
    default:
      image.src = "cloud.png";
      document.body.style.backgroundImage = "url('cloudy.gif')";
  }

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
};

const showError = () => {
  container.style.height = "400px";
  weatherBox.classList.remove("active");
  weatherDetails.classList.remove("active");
  error404.classList.add("active");
};

search.addEventListener("click", () => {
  const APIKey = "989abdad7a65814f573bb64f2bddf258";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      container.style.height = "555px";
      error404.classList.remove("active");

      // Add and remove a class to trigger the sliding-in animation
      weatherBox.classList.remove("active");
      weatherDetails.classList.remove("active");

      // Use setTimeout to allow for reflow and trigger the animation
      setTimeout(() => {
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
      }, 100);

      displayWeatherData(json);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      showError();
    });
});
