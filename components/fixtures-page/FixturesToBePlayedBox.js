import React from 'react'
import ToBePlayedDiv from './ToBePlayedDiv';

const FixturesToBePlayedBox = ({ fixtures }) => {

    return (
        <div className='col-span-5 w-full h-full p-10 overflow-y-auto border-r-2 border-r-primary_dark_blue 
        flex flex-col items-center gap-5'>
            { fixtures.filter(fixture => fixture.played === false).map((fixture) => {
                return (
                    <ToBePlayedDiv
                        currentFixtureObj={ fixture }
                        fixturesArray={ fixtures }
                        homeTeam={ fixture.homeTeam }
                        awayTeam={ fixture.awayTeam }
                    />
                )
            }) }
        </div>
    )
}

export default FixturesToBePlayedBox;

