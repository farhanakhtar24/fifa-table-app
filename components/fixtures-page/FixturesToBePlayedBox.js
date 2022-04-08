import React from 'react'
import ToBePlayedDiv from './ToBePlayedDiv';

const DUMMYFIXTURES = [
    {
        homeTeam: {
            id: '1',
            name: 'FC Bayern',
            short: 'FCB',
            url: '/Assets/team-icons/fc-bayern.png',
            stats: {
                ATT: 92,
                MID: 84,
                DEF: 82,
            }
        },
        awayTeam: {
            id: '1',
            name: 'FC Bayern',
            short: 'FCB',
            url: '/Assets/team-icons/fc-bayern.png',
            stats: {
                ATT: 92,
                MID: 84,
                DEF: 82,
            }
        }
    },
    {
        homeTeam: {
            id: '1',
            name: 'FC Bayern',
            short: 'FCB',
            url: '/Assets/team-icons/fc-bayern.png',
            stats: {
                ATT: 92,
                MID: 84,
                DEF: 82,
            }
        },
        awayTeam: {
            id: '1',
            name: 'FC Bayern',
            short: 'FCB',
            url: '/Assets/team-icons/fc-bayern.png',
            stats: {
                ATT: 92,
                MID: 84,
                DEF: 82,
            }
        }
    },
    {
        homeTeam: {
            id: '1',
            name: 'FC Bayern',
            short: 'FCB',
            url: '/Assets/team-icons/fc-bayern.png',
            stats: {
                ATT: 92,
                MID: 84,
                DEF: 82,
            }
        },
        awayTeam: {
            id: '1',
            name: 'FC Bayern',
            short: 'FCB',
            url: '/Assets/team-icons/fc-bayern.png',
            stats: {
                ATT: 92,
                MID: 84,
                DEF: 82,
            }
        }
    },
]

const FixturesToBePlayedBox = () => {
    return (
        <div className='col-span-5 w-full h-full p-10 overflow-y-auto border-r-2 border-r-primary_dark_blue 
        flex flex-col items-center gap-5'>
            { DUMMYFIXTURES.map(fixture => {
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

