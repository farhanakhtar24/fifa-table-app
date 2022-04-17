import React from 'react'
import ToBePlayedDiv from './ToBePlayedDiv';

const FixturesToBePlayedBox = ({ fixtures, table }) => {
    const toBePlayed = fixtures.filter(fixture => fixture.played === false);
    return (
        <div className='col-span-5 w-full h-full p-10 overflow-y-auto border-r-2 border-r-primary_dark_blue 
        flex flex-col items-center gap-5'>
            { toBePlayed.length > 0 && toBePlayed.map((fixture) => {
                return (
                    <ToBePlayedDiv
                        table={ table }
                        currentFixtureObj={ fixture }
                        fixturesArray={ fixtures }
                        homeTeam={ fixture.homeTeam }
                        awayTeam={ fixture.awayTeam }
                    />
                )
            })
            }
            {
                toBePlayed.length === 0 && <p className='uppercase text-2xl font-semibold'>Season Ended</p>
            }
        </div>
    )
}

export default FixturesToBePlayedBox;

