import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import ContentBox from '../UI/ContentBox';

const TeamStatsBox = (props) => {
    const ATT = props.currentlySelected.stats.ATT;
    const MID = props.currentlySelected.stats.MID;
    const DEF = props.currentlySelected.stats.DEF;
    const imgSrc = props.currentlySelected.url;

    return (
        <ContentBox heading={ 'Team Stats' } headingStyle={ 'text-xl font-medium' } styles={ 'rounded-lg' }>
            <div className='w-full h-full flex flex-col items-center gap-3'>
                { imgSrc.length > 0 && <Image src={ imgSrc } width={ 100 } height={ 100 } /> }
                <div className='w-full grid grid-cols-5'>
                    <div></div>
                    <div className='flex flex-col items-center gap-1'>
                        <span className='text-lg'>ATT</span>
                        <span className='text-4xl'>{ ATT }</span>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <span className='text-lg'>MID</span>
                        <span className='text-4xl'>{ MID }</span>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <span className='text-lg'>DEF</span>
                        <span className='text-4xl'>{ DEF }</span>
                    </div>
                    <div></div>
                </div>
            </div>
        </ContentBox>
    )
}

export default TeamStatsBox;