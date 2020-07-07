import React, { useEffect, useState } from "react";
import Expert from "./Expert";
import { fetchExperts } from "../../api";

export default function Experts() {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        fetchExperts()
            .then(data => {
                setExperts(data);
            })
            .catch(err => console.log(err));
    }, []);

    if (experts === null || experts.length === 0 || experts === undefined) {
        return <div className="text-2xl text-center">Loading.....</div>;
    } else {
        return (
            <section className="text-gray-700 body-font">
                <div className="container px-5 py-12 mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                            Welcome to Our Expert Booking Portal
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                            We provide you a world-wide portal with world-class
                            professions to seek the right consult.
                        </p>
                        <div className="flex mt-3 justify-center">
                            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                        </div>
                    </div>
                    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                        {experts.map(expert => {
                            return (
                                <React.Fragment key={expert.id}>
                                    <Expert expert={expert} />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}
