import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIndicatorData } from "../../api/api";

const initialState = {
    selectedIndicators: [],
    selectedIndicatorData: [],
};

export const removeIndicatorDataThunk = createAsyncThunk(
    "indicators/removeIndicatorData",
    async ({ symbol, indicator }, { dispatch, getState }) => {
        try {
            dispatch(removeIndicator(indicator));
            dispatch(removeIndicatorData({ indicator }));
        } catch (error) {
            console.error("Error removing indicator data: ", error);
            throw error;
        }
    }
);

export const fetchIndicatorData = createAsyncThunk(
    "indicators/fetchIndicatorData",
    async ({ symbol, indicator }, { dispatch, getState }) => {
        try {
            const indicatorData = await getIndicatorData(symbol, indicator);
            console.log("fetchIndicatorData " + JSON.stringify(indicatorData));

            dispatch(addIndicator(indicator));
            dispatch(
                addIndicatorData({
                    indicator: indicator,
                    indicatorData: indicatorData,
                })
            );
            console.log("Indicator Data: ", indicatorData);
            return indicatorData;
        } catch (error) {
            console.error("Error fetching indicator data: ", error);
            throw error;
        }
    }
);

export const indicatorsSlice = createSlice({
    name: "indicators",
    initialState,
    reducers: {
        addIndicator: (state, action) => {
            state.selectedIndicators.push(action.payload);
        },
        addIndicatorData: (state, action) => {
            state.selectedIndicatorData.push(action.payload);
        },
        removeIndicator: (state, action) => {
            state.selectedIndicators = state.selectedIndicators.filter(
                (indicator) => indicator !== action.payload
            );
        },
        removeIndicatorData: (state, action) => {
            state.selectedIndicatorData = state.selectedIndicatorData.filter(
                (data) => data.indicator !== action.payload.indicator
            );
        },
        clearIndicators: (state) => {
            state.selectedIndicators = [];
            state.selectedIndicatorData = [];
        },
    },
});

export const {
    addIndicator,
    addIndicatorData,
    removeIndicator,
    clearIndicators,
    removeIndicatorData,
} = indicatorsSlice.actions;
export const indicatorsReducer = indicatorsSlice.reducer;
