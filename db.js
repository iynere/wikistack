'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const router = require('./routes');
const bodyParser = require('body-parser');
const models = require('./models');

// MIDDLEWARE
var env = nunjucks.configure('views', {noCache: true});
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment instance, which we'll want to use to add Markdown support later.
app.set('view engine', 'html');
// have res.render work with html files
app.engine('html', nunjucks.render);
// when res.render works with html files, have it use nunjucks to do so

app.use(express.static('public'));
app.use('/', router);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = app.listen(5432, () => {
	console.log('wikistax server listening on port 5432');
});

models.User.sync({})
.then(() => {
    return models.Page.sync({});
})
.then(() => {
    server.listen(5432, function () {
        console.log('wikistax server listening on port 5432');
    });
})
.catch(console.error);