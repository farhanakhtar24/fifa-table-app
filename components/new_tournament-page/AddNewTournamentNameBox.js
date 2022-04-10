import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentBox from '../UI/ContentBox';
import { useRouter } from 'next/router';
import { makeSelectedTeamsArrayEmpty } from '../../redux/newTournamentSlice';

const AddNewTournamentNameBox = (props) => {
    const router = useRouter();
    const selectedTeams = useSelector(state => state.newTournament.selectedTeams);
    const inputRef = useRef('');
    const dispatch = useDispatch();

    const addTournamentData = async function (selectedTeams) {
        const response = await fetch('/api/new-tournament', {
            method: 'POST',
            body: JSON.stringify(selectedTeams),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();

    }

    const formSubmitHandler = async function (e) {
        e.preventDefault();
        if (inputRef.current.value.length > 0 && selectedTeams.length >= 2) {
            await addTournamentData({ selectedTeams, tournamentName: inputRef.current.value });
            dispatch(makeSelectedTeamsArrayEmpty());
            router.push(`${inputRef.current.value}/points-table`);
        } else if (inputRef.current.value.length === 0 && selectedTeams.length < 2) {
            alert('Please select at least two teams & add a tournament name !!');
        } else if (inputRef.current.value.length === 0) {
            alert('Please enter a tournament name !!');
        } else if (selectedTeams.length < 2) {
            alert('Please select at least two teams !!');
        }
    }

    return (
        <ContentBox heading={ 'Tournament Name' } headingStyle={ 'text-xl font-medium' } styles={ 'rounded-lg' }>
            <form className='w-full h-full flex flex-col gap-4 justify-start items-center'
                onSubmit={ formSubmitHandler }>
                <label className='text-center text-base'>
                    Once the tournament name is set,
                    <br />
                    it can never change.
                </label>
                <input className='w-1/2 bg-input_background/60 outline-none text-center py-3 rounded 
                focus:outline-primary_dark_blue' ref={ inputRef } />
                <button className='w-1/2 bg-input_background outline-none text-center py-3 rounded
                active:bg-primary_dark_blue active:text-white transition-all 
                focus:outline-primary_dark_blue'>Add</button>
            </form>
        </ContentBox>
    )
}

export default AddNewTournamentNameBox;