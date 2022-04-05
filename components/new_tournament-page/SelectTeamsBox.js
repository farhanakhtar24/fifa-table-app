import React from 'react'
import ContentBox from '../UI/ContentBox'
import TeamDiv from './TeamDiv'


const TeamsList = [
    {
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
    {
        id: '2',
        name: 'FC Barcelona',
        short: 'BAR',
        url: '/Assets/team-icons/fc-barcelona.png',
        stats: {
            ATT: 81,
            MID: 83,
            DEF: 80,
        }
    },
    {
        id: '3',
        name: 'Chelsea FC',
        short: 'CHE',
        url: '/Assets/team-icons/chelsea.png',
        stats: {
            ATT: 84,
            MID: 86,
            DEF: 82,
        }
    },
    {
        id: '4',
        name: 'Real Madrid',
        short: 'RMD',
        url: '/Assets/team-icons/rm.png',
        stats: {
            ATT: 84,
            MID: 86,
            DEF: 83,
        }
    },
    {
        id: '5',
        name: 'Manchester United',
        short: 'MNU',
        url: '/Assets/team-icons/man-u.png',
        stats: {
            ATT: 86,
            MID: 83,
            DEF: 84,
        }
    },
    {
        id: '6',
        name: 'Liverpool',
        short: 'LIV',
        url: '/Assets/team-icons/liv.png',
        stats: {
            ATT: 86,
            MID: 83,
            DEF: 86,
        }
    },
    {
        id: '7',
        name: 'Paris Saint-Germain',
        short: 'PSG',
        url: '/Assets/team-icons/psg.png',
        stats: {
            ATT: 89,
            MID: 84,
            DEF: 82,
        }
    },
    {
        id: '8',
        name: 'Manchester City',
        short: 'MNC',
        url: '/Assets/team-icons/man-city.png',
        stats: {
            ATT: 84,
            MID: 86,
            DEF: 85,
        }
    },
    {
        id: '9',
        name: 'Athletico Madrid',
        short: 'ATM',
        url: '/Assets/team-icons/atm.png',
        stats: {
            ATT: 85,
            MID: 82,
            DEF: 82,
        }
    },
    {
        id: '10',
        name: 'Juventus',
        short: 'JUV',
        url: '/Assets/team-icons/juv.png',
        stats: {
            ATT: 82,
            MID: 83,
            DEF: 84,
        }
    },
    {
        id: '11',
        name: 'Inter Milan',
        short: 'INT',
        url: '/Assets/team-icons/inter.png',
        stats: {
            ATT: 84,
            MID: 82,
            DEF: 80,
        }
    },
    {
        id: '12',
        name: 'AC Milan',
        short: 'MIL',
        url: '/Assets/team-icons/milan.png',
        stats: {
            ATT: 77,
            MID: 76,
            DEF: 80,
        }
    },
    {
        id: '13',
        name: 'Ajax',
        short: 'AFC',
        url: '/Assets/team-icons/ajax.png',
        stats: {
            ATT: 81,
            MID: 78,
            DEF: 79,
        }
    },
    {
        id: '14',
        name: 'Tottenham Hotspur',
        short: 'TOT',
        url: '/Assets/team-icons/tottenham.png',
        stats: {
            ATT: 90,
            MID: 81,
            DEF: 80,
        }
    },
    {
        id: '15',
        name: 'Arsenal',
        short: 'ARS',
        url: '/Assets/team-icons/arsenal.png',
        stats: {
            ATT: 79,
            MID: 79,
            DEF: 77,
        }
    },
    {
        id: '16',
        name: 'FC Porto',
        short: 'FCP',
        url: '/Assets/team-icons/fc-porto.png',
        stats: {
            ATT: 78,
            MID: 75,
            DEF: 76,
        }
    },
    {
        id: '17',
        name: 'Borussia Dortmund',
        short: 'DOR',
        url: '/Assets/team-icons/bvb.png',
        stats: {
            ATT: 84,
            MID: 81,
            DEF: 82,
        }
    },
    {
        id: '18',
        name: 'Atalanta',
        short: 'ATA',
        url: '/Assets/team-icons/atalanta.png',
        stats: {
            ATT: 81,
            MID: 78,
            DEF: 77,
        }
    },
    {
        id: '19',
        name: 'SL Benfica',
        short: 'SLB',
        url: '/Assets/team-icons/benfica.png',
        stats: {
            ATT: 74,
            MID: 80,
            DEF: 80,
        }
    },
    {
        id: '20',
        name: 'RB Leipzig',
        short: 'RBL',
        url: '/Assets/team-icons/leipzig.png',
        stats: {
            ATT: 78,
            MID: 79,
            DEF: 79,
        }
    },
    {
        id: '21',
        name: 'Olympique Lyonnais',
        short: 'OL',
        url: '/Assets/team-icons/lyon.png',
        stats: {
            ATT: 77,
            MID: 75,
            DEF: 78,
        }
    },
    {
        id: '22',
        name: 'AS Monaco',
        short: 'ASM',
        url: '/Assets/team-icons/monaco.png',
        stats: {
            ATT: 80,
            MID: 76,
            DEF: 75,
        }
    },
    {
        id: '23',
        name: 'Napoli',
        short: 'NAP',
        url: '/Assets/team-icons/napoli.png',
        stats: {
            ATT: 80,
            MID: 81,
            DEF: 80,
        }
    },
    {
        id: '24',
        name: 'Sevilla',
        short: 'SEV',
        url: '/Assets/team-icons/sevilla.png',
        stats: {
            ATT: 79,
            MID: 80,
            DEF: 82,
        }
    },
    {
        id: '25',
        name: 'Real Sociedad',
        short: 'SAD',
        url: '/Assets/team-icons/real-sociedad.png',
        stats: {
            ATT: 82,
            MID: 81,
            DEF: 77,
        }
    },
    {
        id: '26',
        name: 'Valencia',
        short: 'VAL',
        url: '/Assets/team-icons/valencia.png',
        stats: {
            ATT: 78,
            MID: 77,
            DEF: 76,
        }
    },
    {
        id: '27',
        name: 'Villarreal',
        short: 'VIL',
        url: '/Assets/team-icons/villareal.png',
        stats: {
            ATT: 81,
            MID: 80,
            DEF: 79,
        }
    },
    {
        id: '28',
        name: 'Laizo',
        short: 'LAZ',
        url: '/Assets/team-icons/lazio.png',
        stats: {
            ATT: 82,
            MID: 80,
            DEF: 79,
        }
    }
]

const SelectTeamsBox = (props) => {
    return (
        <ContentBox heading={ 'Select Teams' } headingStyle={ 'text-4xl font-bold' } styles={ 'rounded-lg' }>
            <div className='w-full h-full grid grid-cols-7 grid-rows-4 px-7 pb-7 gap-2'>
                { TeamsList.map((team, index) => {
                    return <TeamDiv
                        key={ index }
                        teamData={ team }
                    />
                }) }
            </div>
        </ContentBox>
    )
}

export default SelectTeamsBox