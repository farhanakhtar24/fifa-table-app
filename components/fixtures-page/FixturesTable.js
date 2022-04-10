import React, { useEffect, useState } from 'react'
import ContentBox from '../UI/ContentBox';
import FixturesToBePlayedBox from './FixturesToBePlayedBox';
import FixturesAlreadyPlayedBox from './FixturesAlreadyPlayedBox';
import { useRouter } from 'next/router';


const FixturesTable = () => {
    const router = useRouter();
    const { tournament } = router.query;

    const [fixtures, setFixtures] = useState([]);

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
        if (tournament !== undefined) {
            fixturesFetcher();
        }
    }, [tournament])


    return (
        <ContentBox heading={ 'Scores & Fixtures' }
            headingStyle={ 'text-4xl font-bold border-b-2 border-b-primary_dark_blue' }
            styles={ 'overflow-hidden' }>
            <div className='w-full h-full grid grid-cols-10 overflow-hidden'>
                <FixturesToBePlayedBox fixtures={ fixtures } />
                <FixturesAlreadyPlayedBox fixtures={ fixtures } />
            </div>
        </ContentBox>
    )
}

export default FixturesTable