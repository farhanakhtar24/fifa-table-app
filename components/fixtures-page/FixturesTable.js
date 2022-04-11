import React, { useEffect, useState } from 'react'
import ContentBox from '../UI/ContentBox';
import FixturesToBePlayedBox from './FixturesToBePlayedBox';
import FixturesAlreadyPlayedBox from './FixturesAlreadyPlayedBox';
import { useRouter } from 'next/router';


const FixturesTable = () => {
    const router = useRouter();
    const { tournament } = router.query;

    const [fixtures, setFixtures] = useState([]);
    const [table, setTable] = useState([]);

    useEffect(() => {
        const fixturesFetcher = async function () {
            const response = await fetch('/api/fetch-fixtures', {
                method: 'POST',
                body: JSON.stringify(tournament),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setFixtures(responseData[0].fixtures);
        }
        const pointsTableFethcer = async function () {
            const response = await fetch('/api/fetch-pointsTable', {
                method: 'POST',
                body: JSON.stringify(tournament),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setTable(responseData[0].pointsTable);
        }
        if (tournament !== undefined) {
            fixturesFetcher();
            pointsTableFethcer();
        }
    }, [tournament])

    return (
        <ContentBox heading={ 'Scores & Fixtures' }
            headingStyle={ 'text-4xl font-bold border-b-2 border-b-primary_dark_blue' }
            styles={ 'overflow-hidden' }>
            <div className='w-full h-full grid grid-cols-10 overflow-hidden'>
                <FixturesToBePlayedBox fixtures={ fixtures } table={ table } />
                <FixturesAlreadyPlayedBox fixtures={ fixtures } />
            </div>
        </ContentBox>
    )
}

export default FixturesTable