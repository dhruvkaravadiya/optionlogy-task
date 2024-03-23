import React from "react";
import sitelogo from "../../assets/images/sitelogo.png";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a
                    href="#"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <Image
                        src={sitelogo}
                        className="h-8"
                        alt="Flowbite Logo"
                        width={32}
                        height={32}
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Trends Scope
                    </span>
                </a>
            </div>
        </nav>
    );
}
