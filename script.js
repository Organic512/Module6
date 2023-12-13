var APIKey = "b0c7cb6a71b8fc52b206ef36225601d1";

async function getCurrentWeather(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    try {
        var response = await fetch(queryURL);
        var data = await response.json();

        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather:", error);
    }
}

async function getForecast(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    try {
        var response = await fetch(queryURL);
        var data = await response.json();

        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function displayCurrentWeather(response) {
    var cityName = response.name;
    var date = new Date(response.dt * 1000);
    var iconUrl = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;

    document.getElementById("current-weather").innerHTML = `
        <h2>${cityName} (${date.toLocaleDateString()}) <img src="${iconUrl}" alt="Weather Icon"></h2>
        <p>Temperature: ${temperature} K</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

function displayForecast(response) {
    var forecastList = response.list;

    var forecastHtml = "";
    for (var i = 0; i < forecastList.length; i += 8) {
        var date = new Date(forecastList[i].dt * 1000);
        var iconUrl = `http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png`;
        var temperature = forecastList[i].main.temp;
        var humidity = forecastList[i].main.humidity;
        var windSpeed = forecastList[i].wind.speed;

        forecastHtml += `
            <div class="forecast-item">
                <p>${date.toLocaleDateString()}</p>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>Temperature: ${temperature} K</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
        `;
    }

    document.getElementById("forecast").innerHTML = forecastHtml;
}

document.getElementById("city-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var city = document.getElementById("city").value.trim();

    getCurrentWeather(city);
    getForecast(city);

    document.getElementById("search-history").innerHTML += `<button class='city-button'>${city}</button>`;
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("city-button")) {
        var city = event.target.textContent;
        getCurrentWeather(city);
        getForecast(city);
    }
});
