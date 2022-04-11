import { MongoClient } from 'mongodb';

// /api/delete-tournament

const handler = async function (req, res) {
    if (req.method === 'POST') {
        const { fixturesArraycopy: fixtures, tournamentName, tableCopy: pointsTable } = req.body;

        const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

        const db = client.db();

        const collection1 = db.collection(tournamentName);
        const updatingFixtures = await collection1.replaceOne({ name: "fixtures" }, { name: 'fixtures', fixtures });
        const updatingTable = await collection1.replaceOne({ name: "pointsTable" }, { name: 'pointsTable', pointsTable });

        client.close();

        res.status(201).json(updatingFixtures, updatingTable);
    }
}

export default handler;
