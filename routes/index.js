const pg = require('pg');

app.get('/',  (req, res, next) => { // my server only responds to a get
	res.render('index.html');
});