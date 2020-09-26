const express = require('express');
const router = express.Router();

const { searchCards, allCards, cardsFromSeries, oneCard } = require('../controllers/cards');

/* 
    /cards?search?=cardnamepage=1&pageLength=20
    responds with an array of cards
    req.body.query for query
    req.body.options for options https://docs.mongodb.com/drivers/node/usage-examples/find
*/
router.get('/', async (req, res) => {
    if (req.query.search) {
        searchCards(req, res);
    } else {
        allCards(req, res);
    }
})
/* 
    /cards/:series?page=1&pageLength=20
    responds with an array of cards
    req.body for options https://docs.mongodb.com/drivers/node/usage-examples/find
*/
router.get('/:series', cardsFromSeries);

/* 
    /cards/:series/:number
    responds with a card object
    req.body for options https://docs.mongodb.com/drivers/node/usage-examples/find
*/
router.get('/:series/:number', oneCard);

module.exports = router;
