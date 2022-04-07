import { MongoClient } from 'mongodb';

// /api/new-tournament

const handler = async function (req, res) {
    if (req.method === 'GET') {
        const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

        const db = client.db();

        const collection = db.collection('tournamentNames');

        const result = await collection.find().toArray();

        client.close();

        res.status(201).json(result);
    }
}

export default handler;