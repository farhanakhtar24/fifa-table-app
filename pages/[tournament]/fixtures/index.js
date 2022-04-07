import React from 'react'
import ActiveButton from '../../../components/UI/ActiveButton';
import InactiveButton from '../../../components/UI/InactiveButton';
import { useRouter } from 'next/router';


const index = () => {
    const router = useRouter();
    const { tournament } = router.query;

    return (
        <div className='fixturesPageClass'>
            <div className='flex gap-1'>
                <InactiveButton url={ '/' }>
                    Tournaments
                </InactiveButton>
                <InactiveButton url={ `/${tournament}/points-table` }>
                    Points Table
                </InactiveButton>
                <ActiveButton url={ `/${tournament}/fixtures` }>
                    Fixtures
                </ActiveButton>
            </div>
        </div>
    )
}

export default index;