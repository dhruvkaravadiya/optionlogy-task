"use client";
import React, { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateSymbol } from "../redux/slices/symbolSlice";

export const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const symbol = useSelector((state) => state.symbol.symbol);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const dispatch = useDispatch(); // Get the dispatch function from react-redux

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        if (inputValue) {
            params.set("query", inputValue);
            dispatch(updateSymbol(inputValue));
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="relative flex  flex-1 flex-shrink-0">
            <input
                className="w-full border border-gray-300 rounded-md py-2 px-4"
                type="text"
                placeholder="Search for a symbol..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button
                className="bg-blue-600 text-white font-semibold px-3 ms-3 rounded-md"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};
