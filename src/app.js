const path      = require('path');
const express   = require('express');
const hbs       = require('hbs');
const geocode   = require('./utils/geocode');
const forecast  = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3001;


const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// define paths for express js templates
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Tony Nguyen'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Tony Nguyen'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Tony Nguyen'
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Weather App',
    name: 'Tony Nguyen',
    errorMessage: 'Help article not found.'
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if  (error) {
      return res.send({ error: error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error })
      }
      res.send({
        location: location,
        forecast: forecastData,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Weather App',
    name: 'Tony Nguyen',
    errorMessage: 'Page Not Found.'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});