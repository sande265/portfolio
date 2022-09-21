import { configureStore } from '@reduxjs/toolkit';
import { AboutSlice, ExperienceSlice, FeaturedSlice, ProjectSlice } from './slices';
import { updateReduxStore } from './storage';

export const store = configureStore({
    reducer: {
        experience: ExperienceSlice,
        about: AboutSlice,
        featured: FeaturedSlice,
        project: ProjectSlice
    },
});

store.subscribe(() => {
    updateReduxStore(store);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
