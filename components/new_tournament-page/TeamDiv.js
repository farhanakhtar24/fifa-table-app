import React, { useState } from 'react'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux'
import { addTeam, removeTeam, setCurrentlySelected, resetCurrentlySelected } from '../../redux/newTournamentSlice';

const TeamDiv = (props) => {
    const dispatch = useDispatch();

    const [isSelected, setIsSelected] = useState(false);

    const handleSelectionClick = () => {
        if (isSelected !== true) {
            dispatch(addTeam(props.teamData));
            dispatch(setCurrentlySelected(props.teamData));
        } else if (isSelected === true) {
            dispatch(removeTeam(props.teamData));
            dispatch(resetCurrentlySelected());
        }
        setIsSelected(!isSelected);
    }

    return (
        <div className={ `w-full h-full p-2 rounded flex flex-col justify-center items-center cursor-pointer
            ${isSelected ? 'border-2 border-primary_dark_blue bg-slate-500/40' : 'bg-input_background'}` }
            onClick={ handleSelectionClick }>
            <Image src={ props.teamData.url } width={ 400 } height={ 400 } alt={ props.teamData.url } />
        </div>
    )
}

export default TeamDiv;