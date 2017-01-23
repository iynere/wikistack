const router = require('express').Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/',  (req, res) => { // my server only responds to a get
	res.render('index.html');
});

router.get('/', (req, res) => {
	res.redirect('/');
});

router.post('/', (req, res, next) => {
	var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
	page.save().then(savedPage => {
		res.redirect(savedPage.route);
	}).catch(next);
});

router.get('/add', (req, res) => {
	res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
	
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(foundPage => {
		res.render('wikipage', {page: foundPage});
	})
	.catch(next);
});

module.exports = router;