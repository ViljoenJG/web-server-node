const express = require('express');
const hbs = require('hbs');

let app = express();
const port = 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${ now } - ${ req.method } ${ req.url }`);
  next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', txt => txt.toUpperCase());

app.get('/', (req, res, next) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our super cool website.'
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Page',
    })
});

app.get('/bad', function (req, res) {
    res.send({
        errorMessage: 'Unable to fulfill the request. Please try again later.',
        status: 400
    })
});

app.listen(port, () => {
  console.log(`Server is up on port ${ port }`);
});
