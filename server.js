const express = require('express');

let app = express();

app.get('/', (req, res, next) => {
   res.send({
       name: 'Kobus',
       likes: [
           'Technology',
           'Sports'
       ]
   })
});

app.get('/about', (req, res) => {
    res.send('About Page.')
});

app.get('/bad', function (req, res) {
    res.send({
        errorMessage: 'Unable to fulfill the request. Please try again later.',
        status: 400
    })
});

app.listen(3000);