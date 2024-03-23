import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    symbol: "RELIANCE.BSE",
};

const symbolSlice = createSlice({
    name: "symbol",
    initialState: {
        initialState,
    },
    reducers: {
        selectSymbol: (state, action) => {
            state.selectedIndicators.push(action.payload);
        },
        updateSymbol: (state, action) => {
            state.symbol = action.payload;
            console.log("State symbol : " + state.symbol);
        },
        clearSymbol: (state) => {
            state.symbol = "RELIANCE.BSE";
        },
    },
});

export const { addIndicator, updateSymbol, clearIndicators } =
    symbolSlice.actions;

export const symbolReducer = symbolSlice.reducer;
