import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { ImBin } from 'react-icons/im';

const TournamentCard = ({ tournamentDetails }) => {
    const { name: tournamentName, imgUrls } = tournamentDetails;
    console.log(imgUrls);
    return (
        <Link href={ `${tournamentName}/points-table` }>
            <a>
                <div className='p-10 border-4 border-primary_dark_blue bg-primary_dark_blue rounded-2xl
                h-full w-full text-3xl font-bold flex flex-col justify-between items-center
                text-white'>
                    <div className='uppercase'>
                        { tournamentName }
                    </div>
                    <div className=''>
                        {/* <Image /> */ }
                    </div>
                    <div className=''>
                        <ImBin />
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default TournamentCard