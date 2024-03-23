import axios from "axios";
import { ALPHAVANTAGE_API_KEY } from "@/config";
import {
    data,
    smaIndicatorData,
    rsiIndicatorData,
    aaronIndicatorData,
    adxIndicatorData,
} from "@/data";

const { useSelector } = require("react-redux");

const baseURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&apikey=${ALPHAVANTAGE_API_KEY}`;

const instance = axios.create({
    baseURL,
});

export const fetchDailyTimeSeries = async (symbol) => {
    try {
        //const response = await instance.get(`&symbol=${symbol}`);
        // const rawData = response.data;

        // const timeSeriesData = rawData["Time Series (Daily)"];

        const timeSeriesData = data["Time Series (Daily)"];
        const timeSeriesArray = Object.entries(timeSeriesData).map(
            ([date, values]) => ({
                date,
                ...values,
            })
        );

        timeSeriesArray.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const metadata = data["Meta Data"];
        const latest30DaysData = timeSeriesArray.slice(-30);
        return { timeSeriesData: latest30DaysData, metadata: metadata };
    } catch (error) {
        throw new Error("Error fetching daily time series data: " + error);
    }
};

export const getIndicatorData = async (symbol, indicator) => {
    symbol = "IBM";
    indicator = "SMA";
    const response = await axios.get(
        `https://www.alphavantage.co/query?function=${indicator}&symbol=${symbol}&interval=daily&time_period=10&series_type=open&outputsize=compact&apikey=NLZFFZX4METI0V6H`
    );
    //console.log(response.data.length + "response.data.length");
    const smaData = smaIndicatorData["Technical Analysis: SMA"];

    //const smaData = response["Technical Analysis: SMA"];

    const smaList = Object.entries(smaData).map(([date, sma]) => ({
        date,
        sma: sma.SMA,
    }));

    smaList.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const latest30DaysSMA = smaList.slice(-30);
    return latest30DaysSMA;
};
