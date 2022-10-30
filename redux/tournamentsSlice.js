import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	tournamentNames: [],
	isLoading: true,
	error: null,
	currentTournament: {
		selectedTeams: [],
		fixtures: [],
		pointsTable: [],
	},
};

export const tournamentNamesFetcher = createAsyncThunk(
	"tournaments/fetchTournamentNames",
	async ({}, { dispatch }) => {
		try {
			const response = await axios.get("/api/fetch-tournamentCards");
			// dispatch(setTournamentNames(response.data));
			// dispatch(setLoading(false));
			return response.data;
		} catch (err) {
			console.log(err);
			return err.message;
		}
	}
);

export const tournamentDetailsFetcher = createAsyncThunk(
	"tournaments/fetchTournamentDetails",
	async ({ tournamentName }, { dispatch }) => {
		try {
			const response = await axios.get(
				`/api/fetch-tournamentDetails?name=${tournamentName}`
			);
			const data = response.data;
			dispatch(setCurrentTournament(data));
		} catch (err) {
			console.log(err);
		}
	}
);

const tournamentsSlice = createSlice({
	name: "tournaments",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setTournamentNames(state, action) {
			state.tournamentNames = action.payload;
		},
		setCurrentTournament(state, action) {
			state.currentTournament.selectedTeams =
				action.payload[0].selectedTeams;
			state.currentTournament.fixtures = action.payload[1].fixtures;
			state.currentTournament.pointsTable = action.payload[2].pointsTable;
		},
	},
	extraReducers(builder) {
		builder.addCase(tournamentNamesFetcher.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(tournamentNamesFetcher.fulfilled, (state, action) => {
			state.tournamentNames = action.payload;
			state.isLoading = false;
		});
		builder.addCase(tournamentNamesFetcher.rejected, (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		});
		builder.addCase(tournamentDetailsFetcher.fulfilled, (state, action) => {
			state.currentTournament.selectedTeams =
				action.payload[0].selectedTeams;

			state.currentTournament.fixtures = action.payload[1].fixtures;
			state.currentTournament.pointsTable = action.payload[2].pointsTable;
		});
		builder.addCase(tournamentDetailsFetcher.rejected, (state, action) => {
			state.error = action.payload;
		});
	},
});

// 		builder.addCase(tournamentNamesFetcher.pending, (state, action) => {
// 			state.isLoading = true;
// 		});
// 		// builder.addCase(tournamentNamesFetcher.fulfilled, (state, action) => {
// 		// 	state.tournamentNames = action.payload;
// 		// 	state.isLoading = false;
// 		// });
// 		builder.addCase(tournamentNamesFetcher.rejected, (state, action) => {
// 			state.error = action.payload;
// 			state.isLoading = false;
// 		});
// 	},
// });

export const { setTournamentNames, setCurrentTournament, setLoading } =
	tournamentsSlice.actions;

export default tournamentsSlice;
