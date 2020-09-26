const createClient = require('../lib/mongodb')

const projection = {
    name: 1,
    imageUrl: 1,
    subtype: 1,
    supertype: 1,
    types: 1,
    series: 1,
    number: 1
}

const sendPage = async (req, res) => {
    const pageLength = req.query.limit ? parseInt(req.query.limit) : 20;
    const pageIdx = req.query.page ? parseInt(req.query.page) : 1;

    const page = await req.cursor
        .skip(pageLength * (pageIdx - 1))
        .limit(pageLength)
        .toArray();

    res.send(page)
}


exports.searchCards = async (req, res) => {
    const client = createClient();
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        req.cursor = collection.aggregate([
            {
                $search: {
                    text: {
                        query: req.query.search,
                        path: "name"
                    }
                }
            }
        ])
            .project(projection);
        await sendPage(req, res);
    } catch (e) {
        console.log(e);
        res.status(500).end(e.toString());
    } finally {
        client.close();
    }
}

exports.allCards = async (req, res) => {
    const client = createClient();
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        req.cursor = collection.find(req.body.query, req.body.options)
            .project(projection);
        await sendPage(req, res);
    } catch (e) {
        res.status(500).end(e.toString());
    } finally {
        client.close();
    }
}

exports.cardsFromSeries = async (req, res) => {
    const client = createClient();
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        req.cursor = await collection.find(req.params, req.body);

        await sendPage(req, res);
    } catch (e) {
        res.status(500).end(e.toString());
    } finally {
        client.close()
    }
}

exports.oneCard = async (req, res) => {
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
}