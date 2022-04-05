import React from 'react'
import TournamentsBox from '../components/root-page/TournamentsBox';
import ActiveButton from '../components/UI/ActiveButton';

const index = () => {
  return (
    <div className='selectTournamentPageCLass'>
      <div className='flex'>
        <ActiveButton url={ '/' }>
          Tournaments
        </ActiveButton>
      </div>
      <TournamentsBox />
    </div>
  )
}

export default index;