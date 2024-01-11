document.addEventListener('DOMContentLoaded', () => {
  const countryInfoElement = document.getElementById('countryInfo');

  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
      countries.forEach(country => {
        const capital = country.capital[0] || 'N/A';
        const latlng = country.latlng || 'N/A';
        const flag = country.flags.png || 'N/A';
        const region = country.region || 'N/A';
        const name = country.name.common || 'N/A';
        const countryCodes = country.cca2 || 'N/A';

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('col-lg-4', 'col-sm-12');

        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.textContent = name;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `
          <img src="${flag}" class="card-img-top" alt="Flag">
          <p class="card-text"><strong>Capital:</strong> ${capital}</p>
          <p class="card-text"><strong>Region:</strong> ${region}</p>
          <p class="card-text"><strong>Country Codes:</strong> ${countryCodes}</p>
        `;

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Get Weather';


button.addEventListener('click', () => {

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=d5ecebfc5ca7961d9284321809f92924`)
    .then(response => response.json())
    .then(weatherData => {
      const existingWeatherInfo = cardBody.querySelector('.weather-info');

      if (existingWeatherInfo) {
        cardBody.removeChild(existingWeatherInfo);
      } else {
        const weatherInfo = document.createElement('div');
        weatherInfo.classList.add('weather-info');
        weatherInfo.innerHTML = `
          <h5 class="mt-3">Weather Information</h5>
          <p><strong>Temperature:</strong> ${weatherData.main.temp} K</p>
          <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
        `;
        cardBody.appendChild(weatherInfo);
      }
    })
    .catch(error => console.error('Error fetching weather data:', error));
});

        cardBody.appendChild(button);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);

        countryInfoElement.appendChild(cardContainer);
      });
    })
    .catch(error => console.error('Error fetching country data:', error));
});
