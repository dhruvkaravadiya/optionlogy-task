"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIndicatorData,
    removeIndicatorDataThunk,
} from "../redux/slices/indicatorSlice";
const IndicatorSelection = ({ symbol }) => {
    const dispatch = useDispatch();
    const selectedIndicators = useSelector(
        (state) => state.indicators.selectedIndicators
    );

    const handleIndicatorChange = (indicator) => {
        if (selectedIndicators.includes(indicator)) {
            dispatch(removeIndicatorDataThunk({ indicator }));
        } else {
            dispatch(fetchIndicatorData({ symbol, indicator }));
        }
    };

    return (
        <div className="bg-white rounded-md p-4 shadow-md">
            <h3 className="font-bold ">Select Indicators</h3>
            <div className="flex gap-3">
                <label>
                    <input
                        className="mr-2"
                        type="checkbox"
                        value="SMA"
                        checked={selectedIndicators.includes("SMA")}
                        onChange={() => handleIndicatorChange("SMA")}
                    />
                    SMA
                </label>
                <label>
                    <input
                        className="mr-2"
                        type="checkbox"
                        value="RSI"
                        checked={selectedIndicators.includes("RSI")}
                        onChange={() => handleIndicatorChange("RSI")}
                    />
                    RSI
                </label>
                <label>
                    <input
                        className="mr-2"
                        type="checkbox"
                        value="ADX"
                        checked={selectedIndicators.includes("ADX")}
                        onChange={() => handleIndicatorChange("ADX")}
                    />
                    ADX
                </label>
                <label>
                    <input
                        className="mr-2"
                        type="checkbox"
                        value="AROON"
                        checked={selectedIndicators.includes("AROON")}
                        onChange={() => handleIndicatorChange("AROON")}
                    />
                    Aroon
                </label>
            </div>
        </div>
    );
};

export default IndicatorSelection;
