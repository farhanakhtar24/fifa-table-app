import React from 'react'
import AlreadyPlayedDiv from './AlreadyPlayedDiv';

const FixturesAlreadyPlayedBox = ({ fixtures }) => {

    return (
        <div className='col-span-5 w-full h-full overflow-y-auto flex flex-col items-center gap-5 p-10'>
            { fixtures.filter(fixture => fixture.played === true).map((fixture) => {
                return (
                    <AlreadyPlayedDiv
                        fixturesArray={ fixtures }
                        homeTeam={ fixture.homeTeam }
                        awayTeam={ fixture.awayTeam }
                    />
                )
            }) }
        </div>
    )
}

export default FixturesAlreadyPlayedBox;