import React, { Fragment } from 'react'
import ActiveButton from '../../../components/UI/ActiveButton';
import InactiveButton from '../../../components/UI/InactiveButton';
import { useRouter } from 'next/router';
import FixturesTable from '../../../components/fixtures-page/FixturesTable';
import Head from 'next/head';

const index = () => {
    const router = useRouter();
    const { tournament } = router.query;

    return (
        <Fragment>
            <Head>
                <title>Fixtures || { `${tournament}`.toUpperCase() }</title>
            </Head>
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
                <FixturesTable />
            </div>
        </Fragment>
    )
}

export default index;