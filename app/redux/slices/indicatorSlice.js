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
            // Remove the indicator data from the state
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

            // Update the state directly by dispatching actions
            dispatch(addIndicator(indicator)); // Example action dispatch
            dispatch(
                addIndicatorData({
                    indicator: indicator,
                    indicatorData: indicatorData,
                })
            ); // Example action dispatch
            // You can dispatch any other actions as needed
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
        // Action to clear all selected indicators
        clearIndicators: (state) => {
            state.selectedIndicators = [];
            state.selectedIndicatorData = [];
        },
    },
});

// Export action creators and reducer
export const {
    addIndicator,
    addIndicatorData,
    removeIndicator,
    clearIndicators,
    removeIndicatorData,
} = indicatorsSlice.actions;
export const indicatorsReducer = indicatorsSlice.reducer;
