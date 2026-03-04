import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { commentReducer } from "./slices/commentSlice";
import { publicApi } from "./services/public";

// ─── Store ────────────────────────────────────────────────────────────────────

export const store = configureStore({
    reducer: {
        comment: commentReducer,
        // RTK Query manages its own slice of state under the reducerPath key
        [publicApi.reducerPath]: publicApi.reducer,
    },
    // resumeApi.middleware enables caching, invalidation, polling, and other
    // RTK Query features. It must be added here or they won't work.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(publicApi.middleware),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ─── Typed Hooks ─────────────────────────────────────────────────────────────

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

