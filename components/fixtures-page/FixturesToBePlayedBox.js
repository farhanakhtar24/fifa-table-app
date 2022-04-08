import React, { useEffect, useState } from 'react'
import ToBePlayedDiv from './ToBePlayedDiv';
import { useRouter } from 'next/router';


// const DUMMYFIXTURES = [
//     {
//         homeTeam: {
//             id: '1',
//             name: 'FC Bayern',
//             short: 'FCB',
//             url: '/Assets/team-icons/fc-bayern.png',
//             stats: {
//                 ATT: 92,
//                 MID: 84,
//                 DEF: 82,
//             }
//         },
//         awayTeam: {
//             id: '1',
//             name: 'FC Bayern',
//             short: 'FCB',
//             url: '/Assets/team-icons/fc-bayern.png',
//             stats: {
//                 ATT: 92,
//                 MID: 84,
//                 DEF: 82,
//             }
//         }
//     },
//     {
//         homeTeam: {
//             id: '1',
//             name: 'FC Bayern',
//             short: 'FCB',
//             url: '/Assets/team-icons/fc-bayern.png',
//             stats: {
//                 ATT: 92,
//                 MID: 84,
//                 DEF: 82,
//             }
//         },
//         awayTeam: {
//             id: '1',
//             name: 'FC Bayern',
//             short: 'FCB',
//             url: '/Assets/team-icons/fc-bayern.png',
//             stats: {
//                 ATT: 92,
//                 MID: 84,
//                 DEF: 82,
//             }
//         }
//     },
//     {
//         homeTeam: {
//             id: '1',
//             name: 'FC Bayern',
//             short: 'FCB',
//             url: '/Assets/team-icons/fc-bayern.png',
//             stats: {
//                 ATT: 92,
//                 MID: 84,
//                 DEF: 82,
//             }
//         },
//         awayTeam: {
//             id: '1',
//             name: 'FC Bayern',
//             short: 'FCB',
//             url: '/Assets/team-icons/fc-bayern.png',
//             stats: {
//                 ATT: 92,
//                 MID: 84,
//                 DEF: 82,
//             }
//         }
//     },
// ]

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
            console.log(responseData[0].fixtures);
            setFixtures(responseData[0].fixtures);
        }
        if (tournament !== undefined) {
            fixturesFetcher();
        }
    }, [tournament])

    return (
        <div className='col-span-5 w-full h-full p-10 overflow-y-auto border-r-2 border-r-primary_dark_blue 
        flex flex-col items-center gap-5'>
            { fixtures.map(fixture => {
                return (
                    <ToBePlayedDiv
                        homeTeam={ fixture.homeTeam }
                        awayTeam={ fixture.awayTeam }
                    />
                )
            }) }
        </div>
    )
}

export default FixturesToBePlayedBox;

