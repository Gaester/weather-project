const request = require("request");
const chalk = require("chalk");

const forecast = (lat,lon, callback) =>{
    
    const url = "http://api.weatherstack.com/current?access_key=4032b07a842c4034c0cd79529efe2bc6&query="+ encodeURIComponent(lat)+ "," + encodeURIComponent(lon) +"&units=m";

     request({url, json:true}, (error, {body})=>{
         if(error){
             callback('Unable to connect to forecast data');
         }
         else if(body.error){
             callback('Latitude or longitude is not a number.');
         }
         else {
             callback(undefined, {
                 location: body.location.region,
                 localtime: body.location.localtime,
                 observation_time: body.current.observation_time,
                 temperature: body.current.temperature,
                 icon_url: body.current.weather_icons[0]
             })
         }
     })
}
module.exports=forecast;