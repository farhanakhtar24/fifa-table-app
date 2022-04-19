import React, { useEffect, useState } from 'react'
import ContentBox from '../UI/ContentBox';
import FixturesToBePlayedBox from './FixturesToBePlayedBox';
import FixturesAlreadyPlayedBox from './FixturesAlreadyPlayedBox';
import { useRouter } from 'next/router';
import { ImSpinner2 } from 'react-icons/im';

const FixturesTable = () => {
    const router = useRouter();
    const { tournament } = router.query;

    const [fixtures, setFixtures] = useState([]);
    const [table, setTable] = useState([]);

    const [isLoadingFixtures, setIsloadingFixtures] = useState(true);

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
            setIsloadingFixtures(false);
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
            { isLoadingFixtures &&
                <div className='w-full h-full flex justify-center items-center'>
                    <ImSpinner2 className='animate-spin w-14 h-14' />
                </div>
            }
            { !isLoadingFixtures &&
                <div className='w-full h-full grid grid-cols-10 overflow-hidden'>
                    <FixturesToBePlayedBox fixtures={ fixtures } table={ table } />
                    <FixturesAlreadyPlayedBox fixtures={ fixtures } />
                </div>
            }
        </ContentBox>
    )
}

export default FixturesTable;