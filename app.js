"use strict";

let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({secret: 'conduit', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
} else {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({'error': err.message});
    });
}


let server = app.listen(3002, () => console.log('Listening on port ' + server.address().port));
