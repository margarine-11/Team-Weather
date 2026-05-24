const apiKey = '81e55f08c02d4ebf3b90e7519f44a65e';
const card = document.querySelector('.card');
const searchBox = document.querySelector('.card_input');
const searchBtn = document.getElementById('searchBtn');
const tempElement = document.querySelector('.card_title--temp');
const cityElement = document.getElementById('city');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const pressureElement = document.getElementById('pressure');
const feelsLikeElement = document.getElementById('feels_like');
const iconElement = document.querySelector('.card_weather-icon');
const dateElement = document.getElementById('date');
const visibilityElement = document.getElementById('visibility');
const cloudsElement = document.getElementById('clouds');

const showDate = () => {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleString('ru-RU', { month: 'long' });
    dateElement.innerHTML = `${day} ${monthName}`;
};

async function getWeather(cityName) {
    cityName = cityName.trim();
    if (!cityName) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`);
        if (!response.ok) throw new Error('Город не найден');

        const result = await response.json();
        console.log(result);

        cityElement.textContent = result.name;
        tempElement.textContent = `${Math.round(result.main.temp)}°C`;
        humidityElement.textContent = `${result.main.humidity}%`;
        windElement.textContent = `${Math.round(result.wind.speed)} m/s`;
        pressureElement.textContent = `${result.main.pressure} гПа`;
        feelsLikeElement.textContent = `${Math.round(result.main.feels_like)}°C`;
        visibilityElement.textContent = `${(result.visibility / 1000).toFixed(1)} км`;
        cloudsElement.textContent = `${result.clouds.all}%`;

        const iconCode = result.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconElement.src = iconUrl;
        iconElement.alt = result.weather[0].description;

        card.classList.add('active');
        card.style.height = '700px';   // увеличено для 6 строк
    } catch (err) {
        alert(err.message);
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(searchBox.value);
});

showDate();