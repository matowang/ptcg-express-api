const projection = {
    cardId: 1,
    name: 1,
    imageUrl: 1,
    subtype: 1,
    supertype: 1,
    types: 1,
    series: 1,
    price: 1,
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

exports.allCards = async (req, res, next) => {
    try {
        const stages = []
        if (req.query.search) {
            stages.push({
                $search: {
                    text: {
                        query: req.query.search,
                        path: "name"
                    }
                }
            })
        }
        let cursor = req.collection.aggregate(stages).project(projection);
        req.cursor = cursor;
        await sendPage(req, res);
    } catch (err) {
        next(err);
    }
}

exports.cardsFromSeries = async (req, res, next) => {
    try {
        const stages = [];
        if (req.query.search) {
            stages.push({
                $search: {
                    text: {
                        query: req.query.search,
                        path: "name"
                    }
                }
            })
        }
        stages.push({
            $match: {
                series: {
                    $regex: `(?i)^${req.params.series}`
                }
            }
        })
        req.cursor = await req.collection.aggregate(stages).project(projection);
        await sendPage(req, res);
    } catch (err) {
        next(err);
    }
}

exports.oneCard = async (req, res, next) => {
    try {
        const card = await req.collection.findOne(req.params, req.body);
        res.send(card);
    } catch (err) {
        next(err);
    }
}


exports.cardsFromIds = async (req, res, next) => {
    const cardIds = req.params.ids.split("+");
    try {
        const stages = [];
        stages.push({
            $match: {
                cardId: {
                    $in: cardIds
                }
            }
        })
        cards = await req.collection.aggregate(stages).project(projection).toArray();
        res.send(cards)
    } catch (err) {
        next(err);
    }
}