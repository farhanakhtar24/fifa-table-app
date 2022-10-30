import Link from "next/link";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { ImBin } from "react-icons/im";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/tournamentsSlice";

const TournamentCard = ({ tournamentDetails }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { name: tournamentName, imgUrls } = tournamentDetails;

	const deleteTournamentHandler = async function () {
		const ans = confirm("Are you sure you want to delete this tournament?");
		if (ans) {
			const response = await fetch("/api/delete-tournament", {
				method: "POST",
				body: JSON.stringify(tournamentName),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			router.reload(window.location.pathname);
		}
	};

	return (
		<div
			className="w-full h-full flex flex-col items-center pb-10 border-4 text-white
                border-primary_dark_blue bg-primary_dark_blue rounded-2xl gap-5">
			<a
				onClick={() => {
					router.push(`${tournamentName}/points-table`);
				}}
				className="px-10 pt-10 flex flex-col justify-between items-center gap-5 h-full w-full 
                text-2xl font-semibold cursor-pointer">
				<div className="uppercase w-full text-center">
					<div className="truncate">{tournamentName}</div>
				</div>
				<div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-x-3 items-center">
					{imgUrls.slice(0, 5).map((imgUrl) => {
						return (
							<div className="w-full h-fit flex bg-tournament_card_imgs_bg/60 rounded-lg p-1">
								<Image
									src={imgUrl}
									width={400}
									height={400}
									className=""
								/>
							</div>
						);
					})}
					{imgUrls.length > 5 && (
						<div className="w-full h-fit flex justify-center">
							...
						</div>
					)}
				</div>
			</a>
			<button
				className="text-xl text-white"
				onClick={deleteTournamentHandler}>
				<ImBin className="hover:text-red-500 transition-all" />
			</button>
		</div>
	);
};

export default TournamentCard;
