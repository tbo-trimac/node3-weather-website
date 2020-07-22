const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require(path.join(__dirname, '../src/utils/forecast'))
const geocode = require(path.join(__dirname, '../src/utils/geocode'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tannis Bo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tannis Bo',
        message: 'Here is the message'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tannis Bo'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({error})
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({error})
        }


        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }


            res.send({
                location: location,
                forecast: forecastData.weather,
                address: req.query.address
            })

        })

    })

})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provice a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Tannis Bo'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Tannis Bo'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})

