const apiKay='81e55f08c02d4ebf3b90e7519f44a65e';
const card = document.querySelector('.card');
const searcBox = document.querySelector('.card_input');
const searchBtn = document.getElementById('searchBtn');
const temp = document.querySelector('.card_title--temp');
const city = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const icon = document.querySelector('.card_weather-icon');
const date = document.getElementById('date');
const weatherBlock = document.querySelector('.card_weather');


const showDate =() => {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleString('en-US', { month: 'long' });
    date.innerHTML = `${day} ${monthName}`
}

async function getWeather(city) {

    city=city.trim();
    if (!city) return;

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKay}&units=metric`);

        if (!response.ok) throw new Error('City not found');

            const result = await response.json();

            console.log(result);

            card.classList.add('active');
            card.style.height = '500px';

            const iconUrl = `https://openweathermap.org/payload/api/media/file/${result.weather[0].icon}@4x.png`;
            icon.src = iconUrl;

        
    } catch (err) {
        alert(err.message);
    }
}


searchBtn.addEventListener('click', () => {
    getWeather(searcBox.value);
})

showDate();


