const {MongoClient} = require('mongodb');

const userName = "anonymous4586";
const password = "n3ObW4PyywL5Q09I";
const hostname = "cluster4586.ihxvlbq.mongodb.net";


if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('simon').collection('score');

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = {score: {$gt: 0}};
  const options = {
    sort: {score: -1},
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addScore, getHighScores};