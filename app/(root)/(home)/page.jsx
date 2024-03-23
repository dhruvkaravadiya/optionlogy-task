import React from "react";
import { SearchBar } from "../../components/SearchBar";
import { ChartComponent } from "../../components/Chart";
import IndicatorSelection from "../../components/IndicatorSelector";
import { fetchDailyTimeSeries } from "@/app/api/api";
import InfoCard from "@/app/components/InfoCard";
import CurrentData from "@/app/components/CurrentData";
import CurrentIndicatorValueCard from "@/app/components/CurrentIndicatorValueCard";
export default async function LayoutPage({ searchParams }) {
    const query = searchParams?.query || "";
    const response = await fetchDailyTimeSeries(query);
    return (
        <>
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-row gap-5">
                    <div className="text-black h-auto bg-white p-5 rounded-md shadow-md">
                        <SearchBar />
                        <div className="py-2">
                            <ChartComponent data={response.timeSeriesData} />
                        </div>
                    </div>
                    <div className="text-black h-min flex flex-col gap-5">
                        <IndicatorSelection symbol={query} />
                        <CurrentData
                            data={response.timeSeriesData}
                            metadata={response.metadata}
                        />
                        <CurrentIndicatorValueCard />
                    </div>
                </div>
                <InfoCard
                    title="Last 7 days BSE data"
                    data={response.timeSeriesData}
                />
            </div>
        </>
    );
}
