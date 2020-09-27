const createClient = require('../lib/mongodb')

module.exports = (db, collection) => async (req, res, next) => {
    const client = createClient();
    try {
        await client.connect();
        req.collection = client.db(db).collection(collection);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
    req.on("end", () => {
        client.close();
    });
}