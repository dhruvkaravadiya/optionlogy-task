"use client";
import React from "react";
import { useSelector } from "react-redux";

const CurrentIndicatorValueCard = () => {
    const indicator = useSelector(
        (state) => state.indicators?.selectedIndicatorData
    );

    // Check if indicator is null or an empty array
    if (!indicator || indicator.length === 0) {
        return (
            <div className="bg-white rounded-md p-4 shadow-md text-black">
                <h2 className="font-bold text-lg mb-4">Indicators</h2>
                <h3>No Indicators Selected</h3>
            </div>
        );
    }

    // Access the first element of indicator only if it exists
    const sortedData = indicator[0]?.indicatorData
        ? indicator[0].indicatorData
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

    // Check if sortedData has any elements before accessing its properties
    const smaValue = sortedData.length > 0 ? sortedData[0].sma : null;

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
                                {smaValue || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrentIndicatorValueCard;
