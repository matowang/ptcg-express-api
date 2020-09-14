const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://matowang:TDBoTtk3Ae3H9RoC@pokemon-cards.99cuv.mongodb.net?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true });

export default client;