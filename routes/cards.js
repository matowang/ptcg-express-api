const express = require('express');
const router = express.Router();

const createClient = require('../lib/mongodb')

/* 
    /cards/:series?page=1&pageLength=20
    responds with an array of cards
    req.body.query for query
    req.body.options for options https://docs.mongodb.com/drivers/node/usage-examples/find
*/
router.get('/', async (req, res) => {
    const client = createClient();
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        const cursor = await collection.find(req.body.query, req.body.options);

        const pageLength = req.query.pageLength ? parseInt(req.query.pageLength) : 20;
        const pageIdx = req.query.page ? parseInt(req.query.page) : 0;

        const page = await cursor.skip(pageLength * pageIdx).limit(pageLength).toArray();
        res.send(page);
    } catch (e) {
        res.status(500).end(e.toString());
    } finally {
        client.close();
    }
})
/* 
    /cards/:series?page=1&pageLength=20
    responds with an array of cards
    req.body for options https://docs.mongodb.com/drivers/node/usage-examples/find
*/
router.get('/:series', async (req, res) => {
    const client = createClient();
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        const cursor = await collection.find(req.params, req.body);

        const pageLength = req.query.pageLength ? parseInt(req.query.pageLength) : 20;
        const pageIdx = req.query.page ? parseInt(req.query.page) : 0;

        console.log(req.query);
        const page = await cursor.skip(pageLength * pageIdx).limit(pageLength).toArray();
        res.send(page);
    } catch (e) {
        res.status(500).end(e.toString());
    } finally {
        client.close()
    }
});

/* 
    /cards/:series/:number
    responds with a card object
    req.body for options https://docs.mongodb.com/drivers/node/usage-examples/find
*/
router.get('/:series/:number', async (req, res, next) => {
    const client = createClient()
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        const card = await collection.findOne(req.params, req.body);
        res.send(card);
    } catch (e) {
        res.status(500).end(e.toString());
    } finally {
        client.close();
    }
});

module.exports = router;
