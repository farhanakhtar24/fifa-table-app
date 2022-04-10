import { MongoClient } from 'mongodb';

// /api/delete-tournament

const handler = async function (req, res) {
    if (req.method === 'POST') {
        const tournamentName = req.body;

        const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

        const db = client.db();

        const collection1 = db.collection('tournamentNames');
        const result = await collection1.deleteOne({ name: tournamentName });

        const collection2 = db.collection(tournamentName);
        const result2 = await collection2.drop();

        client.close();

        res.status(201).json({ message: 'Tournament deleted successfully' });
    }
}

export default handler;