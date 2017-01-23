var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

const Page = db.define('page', {
 //table schema of attributes
	title: {type: Sequelize.STRING, allowNull: false},
	urlTitle: {type: Sequelize.STRING, allowNull: false},
	content: {type: Sequelize.TEXT, allowNull: false},
	status: {type: Sequelize.ENUM('open', 'closed')}
	// , date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNULL: false}
}, {
	hooks: {
		beforeValidate: function(page) {
			
			page.urlTitle = page.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '_');
		}
	}
}, {
	getterMethods: {
		route: () => {
		return `/wiki/${this.urlTitle}`;
		} 
	}
});

const User = db.define('user', {
	//table schema of attributes
	name: {type: Sequelize.STRING, allowNull: false},
	email: {type: Sequelize.STRING, allowNull: false, isEmail: true}
});

module.exports = {
	Page: Page,
	User: User
};