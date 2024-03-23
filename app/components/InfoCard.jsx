import React from "react";

const InfoCard = ({ title, data }) => {
    // Get the last 7 days of data
    const last7DaysData = data.slice(-7).reverse();

    return (
        <div className="text-black mt-8 w-5/6">
            <h3 className="font-bold text-lg">{title}</h3>
            <table className="mt-4 w-full rounded-md bg-white p-4 shadow-md">
                <thead className="bg-slate-300">
                    <tr>
                        {Object.keys(data[0]).map((key) => {
                            // Remove the numbering from the keys
                            const trimmedKey = key.replace(/^\d+\. /, "");
                            return (
                                <th
                                    key={key}
                                    className="px-4 py-2 text-left font-semibold border"
                                >
                                    {trimmedKey}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {last7DaysData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, index) => (
                                <td key={index} className="px-4 py-2 border">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InfoCard;
