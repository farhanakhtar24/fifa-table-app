import { configureStore } from "@reduxjs/toolkit";
import newTournamentSlice from "./newTournamentSlice";
import tournamentsSlice from "./tournamentsSlice";

const store = configureStore({
	reducer: {
		newTournament: newTournamentSlice.reducer,
		tournament: tournamentsSlice.reducer,
	},
});

export default store;
