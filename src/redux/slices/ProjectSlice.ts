import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export declare interface ProjectState extends DefaultRdxState {
    project: DataObj;
    projects: Array<DataObj>;
}

const initialState: ProjectState = {
    project: {},
    projects: [],
    processing: false,
    error: {},
};

const { reducer, actions } = createSlice({
    name: 'project',
    initialState,
    reducers: {
        processing: (state: ProjectState) => {
            state.processing = true;
        },
        getAllSuccess: (state, { payload }: PayloadAction<DataObj>) => {
            state.projects = payload.data;
            state.processing = false;
        },
        getAllError: (state, { payload }: PayloadAction<DataObj>) => {
            state.error = payload?.data;
            state.projects = [];
            state.processing = false;
        },
        getOneSuccess: (state, { payload }: PayloadAction<DataObj>) => {
            state.project = payload.data;
            state.processing = false;
        },
        getOneError: (state, { payload }: PayloadAction<DataObj>) => {
            state.error = payload?.data;
            state.processing = false;
        },
    },
});

export const { processing, getAllError, getAllSuccess, getOneError, getOneSuccess } = actions;

export { reducer as ProjectSlice };
