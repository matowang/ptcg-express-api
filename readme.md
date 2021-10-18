# PTCG Card Backend

Built using Express.js using MongoDB as a database and Serverless for hosting

## Start debugging command
`$env:DEBUG='ptcg-express-api:*'; npm start`

`$env:DEBUG='ptcg-express-api:*'; nodemon ptcg-express-api`

## Deploy To AWS
`serverless deploy`

# API Guide

## /cards All Cards

/cards?search?=cardnamepage=1&pageLength=20

`https://5psbsxe99b.execute-api.ap-northeast-2.amazonaws.com/dev/cards/`

`https://5psbsxe99b.execute-api.ap-northeast-2.amazonaws.com/dev/cards/?search=古`

responds with an array of cards

req.body.query for query

req.body.options for options https://docs.mongodb.com/drivers/node/usage-examples/find

## /cards/id/:ids Card Data from multiple Ids

/cards/id/ac2a-A-004+ac2a-A-003+ac2a-A-001

`https://5psbsxe99b.execute-api.ap-northeast-2.amazonaws.com/dev/cards/id/ac2a-A-004+ac2a-A-003+ac2a-A-001`

Responds with an array of cards from selected ids

Great for getting a deck of cards

## /cards/:series Paginated Data Based on Series

/cards/:series?page=1&pageLength=20

`https://5psbsxe99b.execute-api.ap-northeast-2.amazonaws.com/dev/cards/AC1b?page=2`

Default pageLength = 20
Default page = 1

req.body for options https://docs.mongodb.com/drivers/node/usage-examples/find

## /cards/:series/:number Single Card

`https://5psbsxe99b.execute-api.ap-northeast-2.amazonaws.com/dev/cards/AC1a/001`

Responds with a single card object
