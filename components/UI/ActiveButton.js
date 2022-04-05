import React from 'react'
import Link from 'next/link';


const ActiveButton = (props) => {
    return (
        <Link href={ props.url }>
            <a>
                <button className='font-semibold py-1.5 px-10 bg-active_button_blue/80 rounded-t text-xl'>
                    { props.children }
                </button>
            </a>
        </Link>
    )
}

export default ActiveButton;