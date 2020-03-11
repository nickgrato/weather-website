const geocode = require('./utils/geocode')
const darkSky = require('./utils/darkSky')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Init handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
   res.render('index', {
     title: 'Weather App',
     name: 'Nick Grato'
   })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Nick Grato'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Nick Grato',
    message: 'This is a page to help you get to where you want.'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'No search term dummy'
    })
  }

  geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
    if(error){
      return res.send({
        error: error
      })
    }

    darkSky(latitude,longitude,(error,forcastData) => {
      if(error){
        return res.send({
          error: error
        })
      }
      res.send({
        forcast: forcastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req,res)=>{
  if(!req.query.search){
    return res.send({
      error: 'No search term dummy'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help 404 page',
    name: 'Nick Grato',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'General 404 page',
    name: 'Nick Grato',
  })
})

app.listen(port, () => {
  console.log('Running on port ' + port)
})