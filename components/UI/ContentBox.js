import React from 'react'

const ContentBox = (props) => {
    return (
        <div className={ `w-full h-full bg-Content_box_background/75 backdrop-blur-sm rounded-b-lg rounded-tr-lg
        flex flex-col ${props.styles}` }>
            <div className={ `uppercase ${props.headingStyle} text-center py-7` }>
                { props.heading }
            </div>
            { props.children }
        </div>
    )
}

export default ContentBox;