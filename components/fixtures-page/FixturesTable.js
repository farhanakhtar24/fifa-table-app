import React from 'react'
import { useRouter } from 'next/router';
import ContentBox from '../UI/ContentBox';
import FixturesToBePlayedBox from './FixturesToBePlayedBox';
import FixturesAlreadyPlayedBox from './FixturesAlreadyPlayedBox';


const FixturesTable = () => {
    const router = useRouter();
    const { tournament } = router.query;

    return (
        <ContentBox heading={ 'Scores & Fixtures' }
            headingStyle={ 'text-4xl font-bold border-b-2 border-b-primary_dark_blue' }
            styles={ 'overflow-hidden' }>
            <div className='w-full h-full grid grid-cols-10 overflow-hidden'>
                <FixturesToBePlayedBox />
                <FixturesAlreadyPlayedBox />
            </div>
        </ContentBox>
    )
}

export default FixturesTable