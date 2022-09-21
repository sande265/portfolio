import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export declare interface AboutState extends DefaultRdxState {
    aboutme: DataObj;
    abouts: Array<DataObj>;
}

const initialState: AboutState = {
    aboutme: {},
    abouts: [],
    processing: false,
    error: {},
};

const { reducer, actions } = createSlice({
    name: 'about',
    initialState,
    reducers: {
        processing: (state: AboutState) => {
            state.processing = true;
        },
        getAllSuccess: (state, { payload }: PayloadAction<DataObj>) => {
            state.abouts = payload.data;
            state.processing = false;
        },
        getAllError: (state, { payload }: PayloadAction<DataObj>) => {
            state.error = payload?.data;
            state.abouts = [];
            state.processing = false;
        },
        getOneSuccess: (state, { payload }: PayloadAction<DataObj>) => {
            state.abouts = payload.data;
            state.processing = false;
        },
        getOneError: (state, { payload }: PayloadAction<DataObj>) => {
            state.error = payload?.data;
            state.processing = false;
        },
    },
});

export const { processing, getAllError, getAllSuccess, getOneError, getOneSuccess } = actions;

export { reducer as AboutSlice };
