import React from 'react'
import ContentBox from '../UI/ContentBox';
import AddNewTournamentCard from './AddNewTournamentCard';

const TournamentsBox = () => {
    return (
        <ContentBox heading={ 'tournaments' } headingStyle={ 'text-4xl font-bold' }>
            <div className='w-full h-full grid grid-cols-5 gap-10 px-14 pb-14'>
                <AddNewTournamentCard />
            </div>
        </ContentBox>
    )
}

export default TournamentsBox;