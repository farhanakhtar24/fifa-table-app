import { configureStore } from '@reduxjs/toolkit'
import newTournamentSlice from './newTournamentSlice';

const store = configureStore({
    reducer: {
        newTournament: newTournamentSlice.reducer,
    },
});

export default store;