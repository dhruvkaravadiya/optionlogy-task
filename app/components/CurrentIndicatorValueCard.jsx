"use client";
import React from "react";
import { useSelector } from "react-redux";

const CurrentIndicatorValueCard = () => {
    const indicator = useSelector(
        (state) => state.indicators.selectedIndicatorData
    );
    const sortedData = indicator[0].indicatorData
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestData = sortedData[0];

    if (!indicator || indicator.length === 0) {
        return (
            <div className="bg-white rounded-md p-4 shadow-md text-black">
                <h2 className="font-bold text-lg mb-4">Indicators</h2>
                <h3>No Inticators Selected</h3>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-md p-4 shadow-md text-black">
            <h2 className="font-bold text-lg mb-4">Indicators</h2>
            <table className="w-full border-collapse">
                <tbody>
                    {indicator.map((item, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-gray-200" : ""}
                        >
                            <th className="py-2 px-4 border">
                                {item.indicator}
                            </th>
                            <td className="py-2 px-4 border">
                                {latestData.sma || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrentIndicatorValueCard;
