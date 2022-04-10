import { MongoClient } from 'mongodb';

// /api/new-tournament

const handler = async function (req, res) {
    if (req.method === 'POST') {
        const tournamentName = req.body;

        const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

        const db = client.db();

        const collection = db.collection(tournamentName);

        const result = await collection.find({ name: 'pointsTable' }).toArray();


        client.close();

        res.json(result);

    }
}

export default handler;