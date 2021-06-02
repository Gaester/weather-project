const request = require("request");

const forecast = (lat,lon, callback) =>{
    
    const url = "http://api.weatherstack.com/current?access_key=5da1610ec96b65189765c8de0c5ac706&query="+ encodeURIComponent(lat)+ "," + encodeURIComponent(lon) +"&units=m";

     request({url, json:true}, (error, {body})=>{
         if(error){
             callback('Unable to connect to forecast data');
         }
         else if(body.error){
             callback('Latitude or longitude is not a number.');
         }
         else {
             callback(undefined, {
                 description: body.current.weather_descriptions[0],
                 location: body.location.region,
                 localtime: body.location.localtime,
                 observation_time: body.current.observation_time,
                 temperature: body.current.temperature,
                 icon_url: body.current.weather_icons[0],
                 humidity: body.current.humidity,
                 feelslike:body.current.feelslike
             })
         }
     })
}
module.exports=forecast;