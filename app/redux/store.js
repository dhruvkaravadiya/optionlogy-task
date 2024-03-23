import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { indicatorsReducer } from "./slices/indicatorSlice";
import { symbolReducer } from "./slices/symbolSlice";
export const store = configureStore({
    reducer: { indicators: indicatorsReducer, symbol: symbolReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
