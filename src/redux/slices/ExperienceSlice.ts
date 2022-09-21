import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ExperienceState extends DefaultRdxState {
    experience: DataObj;
    experiences: Array<DataObj>;
}

const initialState: ExperienceState = {
    experience: {},
    experiences: [],
    processing: false,
    error: {},
};

const { reducer, actions } = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        processing: (state: ExperienceState) => {
            state.processing = true;
        },
        getAllSuccess: (state, { payload }: PayloadAction<DataObj>) => {
            state.experiences = payload.data;
            state.processing = false;
        },
        getAllError: (state, { payload }: PayloadAction<DataObj>) => {
            state.error = payload?.data;
            state.experiences = [];
            state.processing = false;
        },
    },
});

export const { processing, getAllError, getAllSuccess } = actions;

export { reducer as ExperienceSlice };
