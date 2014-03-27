// var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortlydb');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  var Urls = new Schema({
    url: { type: String },
    base_url: { type: String },
    code: { type: String },
    title: { type: String },
    visits: { type: Number }
    // Maybe need to add timestamps?
  });

  var Users = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    // Maybe need to add timestamps?
  });
  module.exports = {
    Urls: mongoose.model('Urls', Urls),
    Users: mongoose.model('Users', Users)
  };
});


// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });
// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
// //   }
// // });

// module.exports = db;
