import React, { Fragment } from 'react'
import ActiveButton from '../../../components/UI/ActiveButton';
import InactiveButton from '../../../components/UI/InactiveButton';
import { useRouter } from 'next/router';
import PointsTable from '../../../components/points_table-page/PointsTable';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

const index = (props) => {
    const router = useRouter();
    const { tournament } = router.query;

    return (
        <Fragment>
            <Head>
                <title>Points Table || { `${tournament}`.toUpperCase() }</title>
            </Head>
            <div className='pointsTablePageClass'>
                <div className='flex gap-1'>
                    <InactiveButton url={ '/' }>
                        Tournaments
                    </InactiveButton>
                    <ActiveButton url={ `/${tournament}/points-table` }>
                        Points Table
                    </ActiveButton>
                    <InactiveButton url={ `/${tournament}/fixtures` }>
                        Fixtures
                    </InactiveButton>
                </div>
                <PointsTable teams={ props.teamsArray } />
            </div >
        </Fragment>
    )
}


export async function getStaticPaths(context) {
    const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

    const db = client.db();

    const collection = db.collection('tournamentNames');

    const result = await collection.find().toArray();

    client.close();

    return {
        fallback: true,
        paths: result.map((tournament) => {
            return {
                params: {
                    tournament: String(tournament.name),
                }
            }
        })
    }
}

export async function getStaticProps(context) {
    const tournamentName = context.params.tournament;

    const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

    const db = client.db();

    const collection = db.collection(tournamentName);

    const result = await collection.find({ name: 'pointsTable' }).toArray();


    client.close();

    return {
        props: {
            teamsArray: result[0].pointsTable.map((team) => {
                return team;
            }),
        },
        revalidate: 1,
    }
}


export default index;