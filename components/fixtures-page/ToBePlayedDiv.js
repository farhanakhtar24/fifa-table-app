import React from 'react'
import Image from 'next/image';

const ToBePlayedDiv = ({ homeTeam, awayTeam }) => {
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
                    <input type='number'
                        placeholder='0'
                        className='w-14 h-14 bg-input_background rounded-lg text-center text-primary_dark_blue
                        focus:outline-none text-2xl'
                    />
                </div>
                <div className='flex justify-center items-center px-5 py-3'>
                    <button className='w-full h-full border-2 border-save_button_color_border_color rounded-lg
                    text-save_button_color_border_color uppercase font-semibold'>save</button>
                </div>
                <div className='flex justify-start items-center'>
                    <input type='number'
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