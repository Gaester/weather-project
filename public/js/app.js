const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const forecastBox = document.querySelector('#forecastBox');
const message1 = document.querySelector('#message1');
const weatherImg = document.querySelector('img');
const address = document.querySelector('#location');
const temperature = document.querySelector('#temperature');
const localtime = document.querySelector('#localtime');
const observation_time = document.querySelector('#observation_time');
const description = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const feelslike = document.querySelector('#feelslike');
const forecastHeader = document.querySelector('#forecast-header');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
  
    message1.textContent='Loading...';
    forecastBox.style.display='none';

    fetch('/weather?address='+encodeURIComponent(location)).then(response=>{
        response.json().then(data=>{
            if(data.error){
                return message1.textContent= data.error;
            }
            message1.textContent="";
            forecastHeader.textContent='Weather Forecast for '+ data.location.split(',')[0];
            forecastBox.style.display='block';
            weatherImg.setAttribute('src' , data.forecast.icon_url);
            address.textContent=data.location;
            description.textContent=data.forecast.description;
            temperature.textContent=data.forecast.temperature+'°C';
            feelslike.textContent=data.forecast.feelslike+'°C';
            humidity.textContent=data.forecast.humidity+ '%';
            localtime.textContent= (data.forecast.localtime).replaceAll('-','/');
            observation_time.textContent=data.forecast.observation_time;

            message1.textContent="";
        })
    })
})