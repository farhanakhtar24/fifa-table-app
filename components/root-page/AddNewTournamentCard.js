import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AddNewTournamentCard = () => {
    // const addNewTournament = async function () {
    //     const response = await fetch('/api/new-tournament', {
    //         method: 'POST',
    //         body: JSON.stringify(['new', 'news']),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     const data = await response.json();
    //     console.log(data);
    // }

    return (
        <Link href={ '/new-tournament' }>
            <a>
                <div className='border-4 border-primary_dark_blue rounded-2xl h-full w-full text-3xl font-bold
                flex flex-col items-center justify-center gap-4 cursor-pointer'>
                    NEW
                    <div className='m-5'>
                        <Image
                            alt="UCL logo"
                            src={ '/Assets/ucl-trophy.png' }
                            width={ 460 }
                            height={ 600 }
                        />
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default AddNewTournamentCard;