import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ContentBox from '../UI/ContentBox'
import PointsTableTeamDiv from './PointsTableTeamDiv'
import { ImSpinner2 } from 'react-icons/im';


const PointsTable = () => {
    const router = useRouter();
    const { tournament } = router.query;

    const [isLoading, setIsloading] = useState(true);

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const tournamentDetailsFetcher = async function () {
            const response = await fetch('/api/fetch-pointsTable', {
                method: 'POST',
                body: JSON.stringify(tournament),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setTeams(responseData[0].pointsTable);
            setIsloading(false);
        }
        if (tournament !== undefined) {
            tournamentDetailsFetcher();
        }
    }, [tournament])


    teams.length > 0 ? teams.sort((a, b) => {
        if (a.points !== b.points) {
            return a.points < b.points ? 1 : -1
        }
        else {
            return (a.goals_for - a.goals_against) < (b.goals_for - b.goals_against) ? 1 : -1
        }
    }) : null;

    return (
        <ContentBox heading={ `${tournament}` }
            headingStyle={ 'text-4xl font-bold border-b-2 border-b-primary_dark_blue' }
            styles={ 'overflow-hidden' }>
            { isLoading &&
                <div className='w-full h-full flex justify-center items-center'>
                    <ImSpinner2 className='animate-spin w-14 h-14' />
                </div>
            }
            { !isLoading &&
                <div className='w-full h-full overflow-y-auto '>
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
                    { teams.length > 0 &&
                        teams.map((team, index) => {
                            return (
                                <PointsTableTeamDiv
                                    rank={ index + 1 }
                                    logo={ team.url }
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
            }
        </ContentBox>
    )
}

export default PointsTable