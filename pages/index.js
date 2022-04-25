import React, { Fragment } from 'react'
import TournamentsBox from '../components/root-page/TournamentsBox';
import ActiveButton from '../components/UI/ActiveButton';
import Head from 'next/head';
import { MongoClient } from 'mongodb';


const index = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Tournaments</title>
      </Head>
      <div className='selectTournamentPageCLass'>
        <div className='flex'>
          <ActiveButton url={ '/' }>
            Tournaments
          </ActiveButton>
        </div>
        <TournamentsBox tournamentsArray={ props.tournamentsArray } />
      </div>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const client = await MongoClient.connect('mongodb+srv://developer-farhan:farhan779@cluster0.83q8h.mongodb.net/tournaments?retryWrites=true&w=majority')

  const db = client.db();

  const collection = db.collection('tournamentNames');

  const result = await collection.find().toArray();

  client.close();
  return {
    props: {
      tournamentsArray: result.map(tournament => {
        return {
          name: tournament.name.toString(),
          imgUrls: tournament.imgUrls,
        }
      }),
    },
    revalidate: 1,
  }
}

export default index;