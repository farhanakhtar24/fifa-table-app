import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTeams: [],
    currentlySelectedTeam: {
        id: '',
        name: '',
        short: '',
        url: '',
        stats: {
            ATT: 0,
            MID: 0,
            DEF: 0,
        },
    }
};

const newTournamentSlice = createSlice({
    name: 'newTournament',
    initialState,
    reducers: {
        addTeam: (state, action) => {
            state.selectedTeams.push(action.payload);
        },
        removeTeam: (state, action) => {
            state.selectedTeams = state.selectedTeams.filter(team => team.id !== action.payload.id);
        },
        setCurrentlySelected: (state, action) => {
            state.currentlySelectedTeam = action.payload;
        },
        resetCurrentlySelected: (state) => {
            state.currentlySelectedTeam = {
                id: '',
                name: '',
                short: '',
                url: '',
                stats: {
                    ATT: 0,
                    MID: 0,
                    DEF: 0,
                },
            }
        }
    }
})

export const { addTeam, removeTeam, setCurrentlySelected, resetCurrentlySelected } = newTournamentSlice.actions;

export default newTournamentSlice;