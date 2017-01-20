const express = require('express');
const router = express.Router();

const pg = require('pg');

router.get('/',  (req, res, next) => { // my server only responds to a get
	res.render('index.html');
});

module.exports = router;