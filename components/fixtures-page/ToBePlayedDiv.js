import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import updateFixturesArray from '../../hooks/use-updateFixturesBox';

const ToBePlayedDiv = ({ homeTeam, awayTeam, currentFixtureObj, fixturesArray }) => {
    const homeTeamScoreRef = useRef('');
    const awayTeamScoreRef = useRef('');

    const router = useRouter();
    const tournamentName = router.query.tournament;

    const scoreSubmitHandler = async function () {
        const pointsTableUpdater = async function () {
            const { playedFixture, fixturesArraycopy } = updateFixturesArray(fixturesArray, currentFixtureObj, homeTeamScoreRef.current.value, awayTeamScoreRef.current.value);
            const response = await fetch('/api/update-pointsTable', {
                method: 'POST',
                body: JSON.stringify({ fixturesArraycopy, tournamentName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData);
            router.reload(window.location.pathname);
        }

        if (tournamentName !== undefined && homeTeamScoreRef.current.value !== '' && awayTeamScoreRef.current.value !== '') {
            pointsTableUpdater();
        } else {
            alert('Please enter a score for both teams !!!');
        }
    }

    return (
        <div className='w-full p-5 grid grid-rows-2 gap-1 rounded-3xl bg-primary_dark_blue text-white'>
            <div className='w-full grid grid-cols-3 text-2xl'>
                <div className='flex justify-evenly items-center'>
                    <div className='w-16 h-16'>
                        <Image src={ homeTeam.url } width={ 400 } height={ 400 } />
                    </div>
                    { homeTeam.short }
                </div>
                <div className='flex justify-center items-center'>
                    vs
                </div>
                <div className='flex justify-evenly items-center'>
                    { awayTeam.short }
                    <div className='w-16 h-16'>
                        <Image src={ awayTeam.url } width={ 400 } height={ 400 } />
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
                        hover:border-white transition-all'>
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