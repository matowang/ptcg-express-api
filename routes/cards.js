const express = require('express');
const router = express.Router();

const client = require('../lib/mongodb')

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        const data = await collection.find(req.body).toArray();
        res.send(data);
    } catch (e) {
        res.status(404).end(e);
    } finally {
        client.close();
    }

});

module.exports = router;
