import { MongoClient } from 'mongodb';

// /api/delete-tournament

const handler = async function (req, res) {
    if (req.method === 'POST') {
        const tournamentName = req.body;

        const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

        const db = client.db();

        const collection = db.collection('tournamentNames');

        const result = await collection.deleteOne({ name: tournamentName });

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Tournament deleted successfully' });
    }
}

export default handler;