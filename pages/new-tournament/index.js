import Head from 'next/head';
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import AddNewTournamentNameBox from '../../components/new_tournament-page/AddNewTournamentNameBox';
import SelectTeamsBox from '../../components/new_tournament-page/SelectTeamsBox';
import TeamStatsBox from '../../components/new_tournament-page/TeamStatsBox';


const index = () => {
    return (
        <Fragment>
            <Head>
                <title>New Tournament</title>
            </Head>
            <div className='newTournamentPageClass'>
                <div className='w-full h-full grid grid-cols-10 gap-5'>
                    <div className='col-span-3 grid grid-rows-2 gap-5'>
                        <AddNewTournamentNameBox />
                        <TeamStatsBox />
                    </div>
                    <div className='w-full h-full col-span-7'>
                        <SelectTeamsBox />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default index;
