import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import updateFulltournament from '../../hooks/use-updateFixturesBox';
import { ImSpinner2 } from 'react-icons/im';


const ToBePlayedDiv = ({ homeTeam, awayTeam, currentFixtureObj, fixturesArray, table }) => {
    const homeTeamScoreRef = useRef('');
    const awayTeamScoreRef = useRef('');

    const router = useRouter();
    const tournamentName = router.query.tournament;

    const [isLoading, setIsloading] = useState(false);


    const scoreSubmitHandler = async function () {
        const tournamentUpdater = async function () {
            const { fixturesArraycopy, tableCopy } = updateFulltournament(
                fixturesArray,
                currentFixtureObj,
                homeTeamScoreRef.current.value,
                awayTeamScoreRef.current.value,
                table
            );
            const response = await fetch('/api/update-pointsTable', {
                method: 'POST',
                body: JSON.stringify({ fixturesArraycopy, tournamentName, tableCopy }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setIsloading(false);
            router.reload(window.location.pathname);
        }

        if (tournamentName !== undefined && homeTeamScoreRef.current.value !== '' && awayTeamScoreRef.current.value !== '') {
            setIsloading(true);
            tournamentUpdater();
        } else {
            alert('Please enter a score for both teams !!!');
        }
    }

    return (
        <div className='w-full p-5 grid grid-rows-2 gap-1 rounded-3xl bg-primary_dark_blue text-white'>
            <div className='w-full grid grid-cols-3 text-2xl'>
                <div className='flex justify-evenly items-center'>
                    <div className='w-16 h-16'>
                        <Image src={ homeTeam.url } width={ 400 } height={ 400 } alt='home-team' />
                    </div>
                    { homeTeam.short }
                </div>
                <div className='flex justify-center items-center'>
                    vs
                </div>
                <div className='flex justify-evenly items-center'>
                    { awayTeam.short }
                    <div className='w-16 h-16'>
                        <Image src={ awayTeam.url } width={ 400 } height={ 400 } alt='away-team' />
                    </div>
                </div>
            </div>
            <div className='w-full grid grid-cols-3'>
                <div className='flex justify-end items-center'>
                    <input ref={ homeTeamScoreRef }
                        type='number'
                        placeholder='0'
                        className='w-14 h-14 bg-input_background rounded-lg text-center text-primary_dark_blue
                        focus:outline-none text-2xl'
                    />
                </div>
                <div className='flex justify-center items-center px-5 py-3'>
                    <button onClick={ scoreSubmitHandler }
                        className='w-full h-full border-2 border-save_button_color_border_color rounded-lg
                        text-save_button_color_border_color uppercase font-semibold hover:text-white 
                        hover:border-white transition-all flex justify-center items-center gap-1'>
                        { isLoading && <ImSpinner2 className='animate-spin' /> }
                        save
                    </button>
                </div>
                <div className='flex justify-start items-center'>
                    <input ref={ awayTeamScoreRef }
                        type='number'
                        placeholder='0'
                        className='w-14 h-14 bg-input_background rounded-lg text-center text-primary_dark_blue
                        focus:outline-none text-2xl'
                    />
                </div>
            </div>
        </div>
    )
}

export default ToBePlayedDiv;