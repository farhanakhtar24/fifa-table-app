import React, { useState } from 'react'
import Image from 'next/image';

const TeamDiv = (props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelectionClick = () => {
        setIsSelected(!isSelected);
        if (isSelected !== true) {
            props.onAddTeam(props.teamData);
        } else if (isSelected === true) {
            props.onRemoveTeam(props.teamData);
        }
    }

    return (
        <div className={ `w-full h-full p-2 rounded flex flex-col justify-center items-center cursor-pointer
        ${isSelected ? 'border-2 border-primary_dark_blue bg-slate-500/40' : 'bg-slate-50/40'}` }
            onClick={ handleSelectionClick }>
            <Image src={ props.teamData.url } width={ 400 } height={ 400 } />
        </div>
    )
}

export default TeamDiv;