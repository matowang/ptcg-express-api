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
    const pageLength = req.query.pageLength ? parseInt(req.query.pageLength) : 20;
    const pageIdx = req.query.page ? parseInt(req.query.page) : 0;

    const page = await req.cursor
        .skip(pageLength * pageIdx)
        .limit(pageLength)
        .toArray();

    res.send(page)
}


exports.searchCards = async (req, res, next) => {
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

exports.allCards = async (req, res, next) => {
    const client = createClient();
    try {
        await client.connect();
        const collection = client.db('ptcg').collection('cards');
        req.cursor = collection.find(req.body.query, req.body.options);
        await sendPage(req, res);
    } catch (e) {
        res.status(500).end(e.toString());
    } finally {
        client.close();
    }
}