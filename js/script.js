// Define default location
let defaultLocation = "Kathmandu, Nepal";

// Function to fetch weather data
async function checkWeather(location) {
    const apiKey = "d2d3ba3c2bb5c57cf563a4a84421dd13";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${location}&appid=${apiKey}`;

    try {
        // Fetch weather data from the API
        const response = await fetch(apiUrl);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure the JSON response contains the necessary data
        if (data.cod !== 200) {
            throw new Error(`Error fetching weather data: ${data.message}`);
        }

        // Update the DOM with the fetched weather data
        updateWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again later.");
    }
}

// Function to update the DOM with weather data
function updateWeather(data) {
    // Update location
    document.querySelector('.location h2').textContent = data.name + ', ' + data.sys.country;

    // Update current temperature
    document.getElementById('temp').textContent = data.main.temp + '°C';

    // Update current clouds description
    document.getElementById('clouds').textContent = data.weather[0].description;

    // Update weather image
    const weatherIcon = data.weather[0].icon;
    const weatherImageUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    document.querySelector('.weather-image img').src = weatherImageUrl;

    // Update sunrise time
    document.getElementById('sunriseTime').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();

    // Update sunset time
    document.getElementById('sunsetTime').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Update wind
    document.getElementById('wind').textContent = data.wind.speed + ' km/h';

    // Update humidity
    document.getElementById('humidity').textContent = data.main.humidity + '%';

    // Update pressure
    document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
}

// Initial weather check for the default location
checkWeather(defaultLocation);

// Event listener for the search form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const inputLocation = document.querySelector('input[type="search"]').value.trim();
    if (inputLocation !== '') {
        checkWeather(inputLocation); // Fetch weather data for the input location
    }
});

// Event listener for top cities dropdown menu
document.querySelectorAll('.dropdown-menu a').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedCity = this.textContent.trim();
        checkWeather(selectedCity); // Fetch weather data for the selected city
    });
});
