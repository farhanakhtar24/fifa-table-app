import React from 'react'
import Link from 'next/link';


const ActiveButton = (props) => {
    return (
        <Link href={ props.url }>
            <a>
                <button className='w-60 text-center font-semibold py-1.5 bg-active_button_blue/75 rounded-t text-xl'>
                    { props.children }
                </button>
            </a>
        </Link>
    )
}

export default ActiveButton;