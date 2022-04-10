import React, { useEffect, useState } from 'react'
import ToBePlayedDiv from './ToBePlayedDiv';
import { useRouter } from 'next/router';

const FixturesToBePlayedBox = () => {
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
        <div className='col-span-5 w-full h-full p-10 overflow-y-auto border-r-2 border-r-primary_dark_blue 
        flex flex-col items-center gap-5'>
            { fixtures.filter(fixture => fixture.played === false).map((fixture, index) => {
                return (
                    <ToBePlayedDiv
                        onSetFixturesArray={ setFixtures }
                        fixturesArray={ fixtures }
                        homeTeam={ fixture.homeTeam }
                        awayTeam={ fixture.awayTeam }
                        index={ index }
                    />
                )
            }) }
        </div>
    )
}

export default FixturesToBePlayedBox;

