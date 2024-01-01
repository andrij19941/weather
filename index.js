const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-detail');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = '3e6bd5a6ceecfb25ecf59ca5f8927b05';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetail.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperatura');
        const description = document.querySelector('.weather-box .description');
        const hunidity = document.querySelector('.weather-detail .humidity span');
        const wind = document.querySelector('.weather-detail .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = './image/clear.png';
                break;

            case 'Rain':
                image.src = '/image/rain.png';
                break;

            case 'Snow':
                image.src = '/image/snow.png';
                break;

            case 'Clouds':
                image.src = './image/cloud.png';
                break;

            case 'Mist':
                image.src = '/image/mist.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        hunidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Kh/h`;

        weatherBox.style.display = '';
        weatherDetail.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetail.classList.add('fadeIn');
        container.style.height = '598px';




    })

})
