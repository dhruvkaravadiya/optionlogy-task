"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useSelector } from "react-redux";

export function ChartComponent({ data }) {
    const stateData = useSelector(
        (state) => state.indicators.selectedIndicatorData
    );
    const [Chart, setChart] = useState(null);

    useEffect(() => {
        // Import react-apexcharts dynamically only on the client-side
        import("react-apexcharts").then((module) => {
            setChart(() => module.default);
        });
    }, []);

    const formatChartData = () => {
        if (!data || data.length === 0) return [];

        return data.map((item) => ({
            x: new Date(item.date).getTime(),
            y: [
                parseFloat(item["1. open"]),
                parseFloat(item["2. high"]),
                parseFloat(item["3. low"]),
                parseFloat(item["4. close"]),
            ],
        }));
    };

    const formatIndicatorData = () => {
        if (!stateData || stateData.length === 0) return [];

        // Process data for each indicator
        return stateData.flatMap((indicator) => {
            return indicator.indicatorData.map((item) => ({
                x: new Date(item.date).getTime(),
                y: parseFloat(item.sma),
                indicator: indicator.indicator, // Include indicator information
            }));
        });
    };

    const options = {
        chart: {
            height: 550,
            width: 500,
            type: "line",
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            type: "datetime",
            categories: formatChartData().map((item) => item.x),
            tickAmount: 20,
        },
        tooltip: {
            x: {
                show: true,
                format: "dd MMM yyyy",
            },
            y: {
                formatter: function (value) {
                    return value !== null ? "$" + value.toFixed(2) : "N/A";
                },
            },
        },
    };

    const series = [
        {
            name: "Prices",
            type: "candlestick",
            data: formatChartData(),
        },
        ...stateData.map((indicator) => ({
            name: indicator.indicator,
            type: "line",
            data: formatIndicatorData().filter(
                (item) => item.indicator === indicator.indicator
            ),
        })),
    ];

    return (
        <>
            {data.length > 0 && Chart && (
                <Chart
                    options={options}
                    series={series}
                    height={550}
                    width={950}
                />
            )}
        </>
    );
}
