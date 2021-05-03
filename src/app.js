const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PublicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(PublicDirectory));

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Melih Selvi'
    });
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name:'Melih Selvi'
    });
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help',
        message: 'if you need help, you can message me through discord.',
        name:'Melih Selvi'
    })
})



app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an adress!'
        }) 
    }

    const location = req.query.address;

    geocode(location, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }

                res.send({
                    location: location,
                    forecast:forecastData,
                    address:req.query.address
                })
          })
    })

    
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        message:'Help article not found.',
        name:'Melih Selvi',
        title:'Error 404: Not Found'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        message:'Page not found.',
        name:'Melih Selvi',
        title:'Error 404: Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})