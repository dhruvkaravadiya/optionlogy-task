import React from "react";

const CurrentData = ({ data, metadata }) => {
    // Get the last item in the data array
    const latestData = data[data.length - 1];

    return (
        <>
            <div className="bg-white rounded-md p-4 shadow-md text-black">
                {metadata && metadata["2. Symbol"] && (
                    <h2 className="font-bold text-lg mb-4">
                        Symbol: {metadata["2. Symbol"]}
                    </h2>
                )}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Attribute</th>
                            <th className="py-2 px-4 border">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(latestData).map(([key, value]) => {
                            // Skip the "date" attribute
                            if (key === "date") return null;

                            // Remove prefix "1." from attribute keys
                            const attribute = key.replace(/^\d+\. /, "");
                            return (
                                <tr key={key}>
                                    <td className="py-2 px-4 border">
                                        {attribute}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {value}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CurrentData;
