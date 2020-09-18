const express = require('express');
const router = express.Router();

const createClient = require('../lib/mongodb')

router.get('/:series', async (req, res) => {
    const client = createClient()
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        const cursor = await collection.find(req.params);
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

router.get('/:series/:number', async (req, res, next) => {
    const client = createClient()
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        const card = await collection.findOne(req.params);
        res.send(card);
    } catch (e) {
        res.status(500).end(e.toString());
    } finally {
        client.close();
    }
});

module.exports = router;
