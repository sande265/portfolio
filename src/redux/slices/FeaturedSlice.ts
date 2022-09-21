import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export declare interface FeaturedState extends DefaultRdxState {
    featured: DataObj;
    featured_projects: Array<DataObj>;
}

const initialState: FeaturedState = {
    featured: {},
    featured_projects: [],
    processing: false,
    error: {},
};

const { reducer, actions } = createSlice({
    name: 'featured',
    initialState,
    reducers: {
        processing: (state: FeaturedState) => {
            state.processing = true;
        },
        getAllSuccess: (state, { payload }: PayloadAction<DataObj>) => {
            state.featured_projects = payload.data;
            state.processing = false;
        },
        getAllError: (state, { payload }: PayloadAction<DataObj>) => {
            state.error = payload?.data;
            state.featured_projects = [];
            state.processing = false;
        },
        getOneSuccess: (state, { payload }: PayloadAction<DataObj>) => {
            state.featured = payload.data;
            state.processing = false;
        },
        getOneError: (state, { payload }: PayloadAction<DataObj>) => {
            state.error = payload?.data;
            state.processing = false;
        },
    },
});

export const { processing, getAllError, getAllSuccess, getOneError, getOneSuccess } = actions;

export { reducer as FeaturedSlice };
