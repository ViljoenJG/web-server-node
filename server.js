const express = require('express');
const hbs = require('hbs');

let app = express();
const port = 3000;

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to our super cool website.'
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear()
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
