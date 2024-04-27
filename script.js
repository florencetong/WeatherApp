document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');

    // Define a function to handle fetching weather data
    function fetchWeather(city) {
        const APIKey = 'da4b7c53bbfd60f3cf194aaa4097ed89';

        if (city === '')
            return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => {
                const error404 = document.querySelector('.not-found');
                const conditions = document.querySelector('.conditions');
                const weatherBar = document.querySelector('.weatherbar');
                const weatherDetails = document.querySelector('.weather-details');
                const cityHide = document.querySelector('.city-hide');

                if (json.cod == '404') {
                    cityHide.textContent = city;
                    conditions.style.height = '400px';
                    weatherBar.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    error404.classList.add('active');
                    return;
                } 

                const image = weatherBar.querySelector('img');
                const temperature = weatherBar.querySelector('.temperature');
                const description = weatherBar.querySelector('.description');
                const humidity = weatherDetails.querySelector('.info-humidity span');
                const wind = weatherDetails.querySelector('.info-wind span');
                const precipitation = weatherDetails.querySelector('.info-precipitation span');
                const visibility = weatherDetails.querySelector('.info-visibility span');
                const airPressure = weatherDetails.querySelector('.info-airpressure span');

                cityHide.textContent = 'city';
                conditions.style.height = '555px';
                conditions.classList.add('active');
                weatherBar.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    conditions.classList.remove('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'icon/shiny.png';
                        break;
                    case 'Rain':
                        image.src = 'icon/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'icon/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'icon/clouds.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'icon/mist.png';
                        break;
                    case 'Drizzle':
                        image.src = 'icon/drizzle.png';
                        break;
                    default:
                        image.src = 'icon/clouds.png';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}
<span>°</span><span>C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${parseInt(json.wind.speed)}Km/h`;
                precipitation.textContent = `${json.clouds.all}%`;
                visibility.textContent = `${json.visibility}m`;
                airPressure.textContent = `${json.main.pressure}hPa`;

                // Reset input field value after successful search
                //searchInput.value = '';
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                // Display an error message to the user if there is a problem with fetching data
                const error404 = document.querySelector('.not-found');
                const conditions = document.querySelector('.conditions');
                const weatherBar = document.querySelector('.weatherbar');
                const weatherDetails = document.querySelector('.weather-details');
                const cityHide = document.querySelector('.city-hide');

                cityHide.textContent = city;
                conditions.style.height = '400px';
                weatherBar.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
            });
    }

    // Attach event listener to search button
    searchButton.addEventListener('click', event => {
        const city = searchInput.value;
        fetchWeather(city);
    });

    attachSearchListener(); // Assuming this is a custom function you have defined elsewhere
});
