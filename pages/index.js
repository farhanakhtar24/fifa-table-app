import React, { Fragment } from "react";
import TournamentsBox from "../components/root-page/TournamentsBox";
import ActiveButton from "../components/UI/ActiveButton";
import Head from "next/head";
import store from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
	return (
		<Fragment>
			<Head>
				<title>Tournaments</title>
			</Head>
			<div className="selectTournamentPageCLass">
				<div className="flex">
					<ActiveButton url={"/"}>Tournaments</ActiveButton>
				</div>
				<TournamentsBox />
			</div>
		</Fragment>
	);
};

export default index;
