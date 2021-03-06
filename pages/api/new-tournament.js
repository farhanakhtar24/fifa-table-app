import { MongoClient } from 'mongodb';
import useDBstructuring from '../../hooks/use-DB-structuring';

// /api/new-tournament

const handler = async function (req, res) {
    if (req.method === 'POST') {
        const { selectedTeams, tournamentName } = req.body;
        const { fixtures, pointsTable } = useDBstructuring(selectedTeams);
        const teamImgUrls = selectedTeams.map(team => team.url);

        const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

        const db = client.db();

        // adding tourament teams and their respective fixtures alongside the points table
        const collection = db.collection(tournamentName);
        const result1 = await collection.insertMany([
            { selectedTeams, name: 'selectedTeams' },
            { fixtures, name: 'fixtures' },
            { pointsTable, name: 'pointsTable' }]
        );

        // adding tourament name with img url to show on the slect tournament box
        const collection2 = db.collection('tournamentNames');
        const result2 = await collection2.insertOne({ imgUrls: teamImgUrls, name: tournamentName });


        client.close();

        res.status(201).json({ message: 'Tournament added successfully' });
    }
}

export default handler;