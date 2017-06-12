const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const favicon = require('serve-favicon');

let app = express();
const port = process.env.PORT || 3000;
let maintenanceMode = false;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const line = `${ req.method } ${ req.url }`;
  log(line);

  next();
});

app.use((req, res, next) => {
    if (maintenanceMode) {
        res.render('maintenance.hbs');
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

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
  log(`Server is up on port ${ port }`)
});

function log(msg, level = 'info') {
    const now = new Date().toString();
    const line = `[${ level.toUpperCase() }] ${ now }: ${ msg }`;

    console.log(line);
    fs.appendFile(__dirname + '/out/server.log', `${line}\n`, (err) => {
        if (err) console.log('Unable to append to server log: ', JSON.stringify(err, undefined, 2));
    });
}
