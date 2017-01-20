'use strict'
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const makesRouter = require('./routes');
const bodyParser = require('body-parser');

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