var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortlydb');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Url = new Schema({
  url: { type: String },
  base_url: { type: String },
  code: { type: String },
  title: { type: String },
  visits: { type: Number }
});

var User = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

module.exports = {
  Urls: mongoose.model('Urls', Url),
  Users: mongoose.model('Users', User)
};
