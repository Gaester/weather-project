const request = require('request');

const geocode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(adress) + ".json?access_token=pk.eyJ1IjoiZ2Flc3RlciIsImEiOiJja245NHhsNjcwYXNwMnBtdWZyazVkaHE0In0.czAxKRAu5phhMNEYTpPxUQ&limit=1";

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather data.')
        }
        else if (body.message || body.features.length===0){
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports=geocode;