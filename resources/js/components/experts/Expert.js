import React from "react";
import { Link } from "react-router-dom";
import ScrollIntoView from "react-scroll-into-view";

export default function Expert({ expert }) {
    return (
        <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                    {expert.name}
                </h2>
                <p className="leading-relaxed text-base">{expert.profession}</p>
                <ScrollIntoView selector="#expert">
                    <Link
                        to={`/experts/${expert.id}`}
                        className="mt-3 text-indigo-500 inline-flex items-center"
                    >
                        More Info
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </ScrollIntoView>
            </div>
        </div>
    );
}
