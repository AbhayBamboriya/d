import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// slices
import authSliceReducer from "./AuthSlice";
import CourseSliceReducer from "./CourseSlice";
import lectureSliceReducer from "./LectureSlice";
import StateSliceReducer from "./StateSlice";
import RazorpaySlice from "./RazorpaySlice";

const rootReducer = combineReducers({
    auth: authSliceReducer,
    course: CourseSliceReducer,
    lecture: lectureSliceReducer,
    stat: StateSliceReducer,
    razorpay: RazorpaySlice
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "razorpay"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }), // includes thunk automatically
    devTools: true
});

export const persistor = persistStore(store);
