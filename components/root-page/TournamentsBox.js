import React, { useEffect, useState } from "react";
import ContentBox from "../UI/ContentBox";
import AddNewTournamentCard from "./AddNewTournamentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TournamentCard from "./TournamentCard";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/tournamentsSlice";

const TournamentsBox = () => {
	const dispatch = useDispatch();
	const tournamentsArray = useSelector(
		(state) => state.tournament.tournamentNames
	);
	const isLoading = useSelector((state) => state.tournament.isLoading);

	return (
		<ContentBox heading={"tournaments"} headingStyle={"text-4xl font-bold"}>
			<div className="w-full h-full pb-12 px-12 grid grid-cols-5 gap-8">
				<div className="col-span-1">
					<AddNewTournamentCard />
				</div>
				<div className="col-span-4">
					{isLoading && (
						<div className="w-full h-full flex justify-center items-center">
							<ImSpinner2 className="text-text-primary animate-spin w-14 h-14" />
						</div>
					)}
					{!isLoading && (
						<Swiper
							slidesPerView={4}
							spaceBetween={30}
							pagination={{
								clickable: true,
							}}
							navigation={true}
							modules={[Navigation, Pagination]}
							className="w-full h-full">
							{tournamentsArray.length > 0 &&
								tournamentsArray.map((tournament, index) => {
									return (
										<SwiperSlide>
											<TournamentCard
												tournamentDetails={tournament}
											/>
										</SwiperSlide>
									);
								})}
						</Swiper>
					)}
				</div>
			</div>
		</ContentBox>
	);
};

export default TournamentsBox;
