import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScrollIntoView from "react-scroll-into-view";

export default function Profile() {
    let { id } = useParams();
    const [expert, setExpert] = useState([]);
    useEffect(() => {
        axios
            .get(`/api/experts/${id}`)
            .then(({ data }) => {
                console.log(data);
                setExpert(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (expert === null || expert === 0 || expert === undefined) {
        return <div className="text-2xl text-center">Loading.....</div>;
    } else {
        return (
            <section id="expert" className="text-gray-700 body-font">
                <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <div className="w-32 h-32 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-16 h-16"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className="text-center lg:w-2/3 w-full">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            {expert.name}
                        </h1>
                        <p className="leading-relaxed text-lg">
                            {expert.profession}
                        </p>
                        <p className="mb-8 leading-relaxed text-lg">
                            {expert.country}
                        </p>
                        <p className="mb-8 leading-relaxed text-lg">
                            Working Hours: {expert.st} - {expert.et}
                        </p>

                        <div className="flex justify-center">
                            <button className="bg-indigo-700 hover:bg-gray-100 text-white hover:text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-200">
                                Book Now
                            </button>
                            <ScrollIntoView selector="#app">
                                <button className="ml-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow transition duration-200">
                                    View other experts
                                </button>
                            </ScrollIntoView>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
