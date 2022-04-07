import React from 'react'
import Link from 'next/link';


const InactiveButton = (props) => {
    return (
        <Link href={ props.url }>
            <a>
                <button className='w-60 text-center font-semibold py-1.5 bg-inactive_button_color rounded-t text-xl'>
                    { props.children }
                </button>
            </a>
        </Link>
    )
}

export default InactiveButton;