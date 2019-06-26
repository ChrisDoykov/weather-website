const express = require('express');
const path = require('path')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chris Doykov'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Chris Doykov'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Chris Doykov'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, place } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Chris Doykov'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Chris Doykov'
    })
});

app.listen(3000, () => {
    console.log('Server is up!')
});
