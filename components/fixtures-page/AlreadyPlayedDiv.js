import Image from 'next/image'
import React from 'react'

const AlreadyPlayedDiv = ({ homeTeam, awayTeam }) => {
    return (
        <div className='w-full p-5 grid grid-cols-3 border-4 border-primary_dark_blue rounded-2xl text-3xl font-semibold'>
            <div className='flex justify-evenly items-center'>
                <div className='w-16 h-16'>
                    <Image src={ homeTeam.url } width={ 400 } height={ 400 } />
                </div>
                { homeTeam.short }
            </div>
            <div className='flex justify-evenly items-center'>
                <div>{ homeTeam.goals }</div>
                <div>-</div>
                <div>{ awayTeam.goals }</div>
            </div>
            <div className='flex justify-evenly items-center'>
                { awayTeam.short }
                <div className='w-16 h-16'>
                    <Image src={ awayTeam.url } width={ 400 } height={ 400 } />
                </div>
            </div>
        </div>
    )
}

export default AlreadyPlayedDiv