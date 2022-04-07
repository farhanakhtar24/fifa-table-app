import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { ImBin } from 'react-icons/im';

const TournamentCard = ({ tournamentDetails }) => {
    const { name: tournamentName, imgUrls } = tournamentDetails;

    return (
        <Link href={ `${tournamentName}/points-table` }>
            <a>
                <div className='p-10 flex flex-col justify-between items-center gap-5 border-4 text-white
                border-primary_dark_blue bg-primary_dark_blue rounded-2xl h-full w-full text-2xl font-semibold '>
                    <div className='uppercase w-full text-center'>
                        <div className='truncate'>
                            { tournamentName }
                        </div>
                    </div>
                    <div className='w-full h-full grid grid-cols-2 grid-rows-3 gap-x-3 items-center'>
                        { imgUrls.slice(0, 5).map((imgUrl) => {
                            return <div className='w-full h-fit flex bg-tournament_card_imgs_bg/60 rounded-lg p-1'>
                                <Image src={ imgUrl } width={ 400 } height={ 400 } className='' />
                            </div>
                        }) }
                        {
                            imgUrls.length > 5 &&
                            <div className='w-full h-fit flex justify-center'>
                                ...
                            </div>
                        }
                    </div>
                    <div className='text-xl'>
                        <ImBin />
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default TournamentCard