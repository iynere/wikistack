var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

const Page = db.define('page', {
 //table schema of attributes
	title: {type: Sequelize.STRING},
	urlTitle: {type: Sequelize.STRING},
	content: {type: Sequelize.TEXT},
	status: {type: Sequelize.ENUM('open', 'closed')}
});

const User = db.define('user', {
	//table schema of attributes
	name: {type: Sequelize.STRING},
	email: {type: Sequelize.STRING}
});

module.exports = {
	Page: Page,
	User: User
};