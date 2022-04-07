import React from 'react'
import ContentBox from '../UI/ContentBox'
import PointsTableTeamDiv from './PointsTableTeamDiv'

const DUMMYTEAMS = [
    {
        id: 1,
        logo: '/Assets/team-icons/fc-bayern.png',
        name: 'FC Bayern',
        played: '6',
        won: '3',
        drawn: '4',
        lost: '3',
        goals_for: '12',
        goals_against: '19',
        points: '11'
    },
    {
        id: 2,
        logo: '/Assets/team-icons/psg.png',
        name: 'Paris Saint Germain',
        played: '10',
        won: '6',
        drawn: '2',
        lost: '2',
        goals_for: '20',
        goals_against: '10',
        points: '16'
    },
    {
        id: 3,
        logo: '/Assets/team-icons/ajax.png',
        name: 'Ajax',
        played: '9',
        won: '6',
        drawn: '3',
        lost: '0',
        goals_for: '22',
        goals_against: '15',
        points: '21'
    },
    {
        id: 4,
        logo: '/Assets/team-icons/atm.png',
        name: 'Atletico Madrid',
        played: '10',
        won: '6',
        drawn: '2',
        lost: '2',
        goals_for: '20',
        goals_against: '10',
        points: '16'
    },
    {
        id: 3,
        logo: '/Assets/team-icons/ajax.png',
        name: 'Ajax',
        played: '9',
        won: '6',
        drawn: '3',
        lost: '0',
        goals_for: '22',
        goals_against: '15',
        points: '21'
    },
    {
        id: 4,
        logo: '/Assets/team-icons/atm.png',
        name: 'Atletico Madrid',
        played: '10',
        won: '6',
        drawn: '2',
        lost: '2',
        goals_for: '20',
        goals_against: '10',
        points: '16'
    },
]

const PointsTable = ({ tournamentName }) => {
    DUMMYTEAMS.sort((a, b) => a.points < b.points ? 1 : -1);

    return (
        <ContentBox heading={ `${tournamentName}` } headingStyle={ 'text-4xl font-bold' }>
            <div className='w-full h-full overflow-y-auto'>
                <PointsTableTeamDiv
                    rank=''
                    logo=''
                    name=''
                    played='P'
                    won='W'
                    drawn='D'
                    lost='L'
                    goals_for='GF'
                    goals_against='GA'
                    points='PTS'
                />
                { DUMMYTEAMS.map((team, index) => {
                    return (
                        <PointsTableTeamDiv
                            rank={ index + 1 }
                            logo={ team.logo }
                            name={ team.name }
                            played={ team.played }
                            won={ team.won }
                            drawn={ team.drawn }
                            lost={ team.lost }
                            goals_for={ team.goals_for }
                            goals_against={ team.goals_against }
                            points={ team.points }
                        />
                    )
                }) }
            </div>
        </ContentBox>
    )
}

export default PointsTable