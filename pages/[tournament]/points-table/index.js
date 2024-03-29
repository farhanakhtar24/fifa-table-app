import React, { Fragment } from "react";
import ActiveButton from "../../../components/UI/ActiveButton";
import InactiveButton from "../../../components/UI/InactiveButton";
import { useRouter } from "next/router";
import PointsTable from "../../../components/points_table-page/PointsTable";
import Head from "next/head";

const index = () => {
	const router = useRouter();
	const { tournament } = router.query;

	return (
		<Fragment>
			<Head>
				<title>Points Table || {`${tournament}`.toUpperCase()}</title>
			</Head>
			<div className="pointsTablePageClass">
				<div className="flex gap-1">
					<InactiveButton url={"/"}>Tournaments</InactiveButton>
					<ActiveButton url={`/${tournament}/points-table`}>
						Points Table
					</ActiveButton>
					<InactiveButton url={`/${tournament}/fixtures`}>
						Fixtures
					</InactiveButton>
				</div>
				<PointsTable />
			</div>
		</Fragment>
	);
};

export default index;
