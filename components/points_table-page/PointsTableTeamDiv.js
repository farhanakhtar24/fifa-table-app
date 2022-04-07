import React from 'react'
import Image from 'next/image';

const PointsTableTeamDiv = (props) => {
    let divColor = '';
    if (props.rank % 2 !== 0) {
        divColor = 'bg-slate-500/20';
    }
    return (
        <div className={ `grid grid-cols-2 w-full py-2 text-lg font-semibold items-center  ${divColor}` }>
            <div className='flex items-center'>
                <div className='grid grid-cols-2 justify-items-center px-2 items-center'>
                    <div>{ props.rank }</div>
                    { props.logo.length > 0 &&
                        <Image src={ props.logo } width={ 75 } height={ 75 } />
                    }
                </div>
                <div className='flex-grow flex justify-start'>{ props.name }</div>
            </div>
            <ul className='grid grid-cols-7 justify-items-center items-center '>
                <li>{ props.played }</li>
                <li>{ props.won }</li>
                <li>{ props.drawn }</li>
                <li>{ props.lost }</li>
                <li>{ props.goals_for }</li>
                <li>{ props.goals_against }</li>
                <li className='font-bold'>{ props.points }</li>
            </ul>
        </div>
    )
}

export default PointsTableTeamDiv