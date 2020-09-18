const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@pokemon-cards.99cuv.mongodb.net/<dbname>?retryWrites=true&w=majority`;
module.exports = () => new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });