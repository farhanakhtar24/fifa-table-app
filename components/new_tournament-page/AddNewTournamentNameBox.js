import React, { useRef } from 'react'
import ContentBox from '../UI/ContentBox';

const AddNewTournamentNameBox = (props) => {
    const inputRef = useRef('');
    const formSubmitHandler = function (e) {
        e.preventDefault();
        console.log(inputRef.current.value);
        console.log(props.selectedTeamsSet);
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
                <button
                    className='w-1/2 bg-input_background outline-none text-center py-3 rounded
                    active:bg-primary_dark_blue active:text-white transition-all 
                    focus:outline-primary_dark_blue'>
                    Add
                </button>
            </form>
        </ContentBox>
    )
}

export default AddNewTournamentNameBox;