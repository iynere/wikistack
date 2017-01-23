var Promise = require('bluebird');
const router = require('express').Router();
const models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/',  (req, res, next) => { 
	var pages = Page.findAll()
	.then(foundPages => {
		res.render('index', {pages: foundPages});		
	})
	.catch(next);
});

router.get('/search', (req, res, next) => {
	res.render('tagsearch');
});

router.get('/results', (req, res, next) => {
	Page.findAll({
		where: {
			tags: {
				$overlap: [`${req.query.tag}`]
			}
		}
	})
	.then(pages => {
		console.log(pages);
		res.render('results', {pages: pages});
	})
	.catch(next);
});

router.post('/', (req, res, next) => {  
  User.findOrCreate({
  	where: {
	  	name: req.body.author,
	  	email: req.body.email
  	}
  })
  .then(values => {
  	var user = values[0];
  	
  	var page = Page.build({
	    title: req.body.title,
	    content: req.body.content,
	    status: req.body.status,
	    tags: req.body.tags.split(' ')
  	});
  	return page.save().then(page => {
  		return page.setAuthor(user);
  	});
  })
  .then(page => {
  	res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', (req, res) => {
	res.render('addpage');
});

router.get('/users', (req, res, next) => {
	var users = User.findAll()
	.then(users => {
		res.render('users', {users: users} );
	})
	.catch(next);
});

router.get('/users/:id', (req, res, next) => {
	var userPromise = User.findById(req.params.id);
	var pagesPromise = Page.findAll({
		where: {
			authorId: req.params.id
		}
	});
	
	Promise.all([
		userPromise,
		pagesPromise
		])
		.then(values => {
			var user = values[0];
			var pages = values[1];
			res.render('user', {user: user, pages: pages});
		})
		.catch(next);
});

router.get('/:urlTitle', (req, res, next) => {
	Page.findOne({
    where: {
        urlTitle: req.params.urlTitle
    },
    include: [
        {model: User, as: 'author'}
    ]
	})
	.then(function (page) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (page === null) {
        res.status(404).send();
    } else {
        res.render('wikipage', {
            page: page
        });
    }
	})
	.catch(next);
});

router.get('/:urlTitle/similar', (req, res, next) => {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	}).then(page => {
		page.findSimilar();
	})
	.then(similarPages => {
		console.log(similarPages);
		// res.render('results', {pages: similarPages});
	}).catch(next);
});


module.exports = router;