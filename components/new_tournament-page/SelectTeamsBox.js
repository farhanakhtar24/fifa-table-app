import React from 'react'
import ContentBox from '../UI/ContentBox'
import TeamDiv from './TeamDiv'

const SelectTeamsBox = (props) => {
    const addTeam = function (teamData) {
        props.selectedTeamsSet.add(teamData);
        props.setCurrentlySelected(teamData);
    }

    const removeTeam = function (teamData) {
        props.selectedTeamsSet.delete(teamData);
    }

    return (
        <ContentBox heading={ 'Select Teams' } headingStyle={ 'text-4xl font-bold' } styles={ 'rounded-lg' }>
            <div className='w-full h-full grid grid-cols-7 grid-rows-4 px-7 pb-7 gap-2'>
                { props.teamsList.map((team, index) => {
                    return <TeamDiv
                        key={ index }
                        teamData={ team }
                        onAddTeam={ addTeam }
                        onRemoveTeam={ removeTeam }
                    />
                }) }
            </div>
        </ContentBox>
    )
}

export default SelectTeamsBox