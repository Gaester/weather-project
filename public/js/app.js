const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const forecastBox = document.querySelector('#forecastBox');
const message1 = document.querySelector('#message1');
const weatherImg = document.querySelector('img');
const address = document.querySelector('#location');
const temperature = document.querySelector('#temperature');
const localtime = document.querySelector('#localtime');
const observation_time = document.querySelector('#observation_time');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
  
    message1.textContent='Loading...';
    forecastBox.style.display='none';

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then(response=>{
        response.json().then(data=>{
            if(data.error){
                return message1.textContent= data.error;
            }
            
            forecastBox.style.display='block';
            weatherImg.setAttribute('src' , data.forecast.icon_url);
            address.textContent= 'Location: '+data.location;
            temperature.textContent= 'Temperature: '+data.forecast.temperature+'°C';
            localtime.textContent= 'Local Time: '+(data.forecast.localtime).replaceAll('-','/');
            observation_time.textContent= 'Observation Time: '+data.forecast.observation_time;

            message1.textContent="";
        })
    })
})