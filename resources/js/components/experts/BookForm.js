import React, { useState, useEffect } from "react";
import { fetchExperts } from "../../api";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

export default function BookForm() {
    const [experts, setExperts] = useState([]);
    const [durHours, setDurHours] = useState([]);
    useEffect(() => {
        fetchExperts()
            .then(data => setExperts(data))
            .catch(err => console.log(err));
        const range = moment.range("2020-07-05 06:00", "2020-07-05 17:00");
        const minutes = Array.from(range.by("minutes", { step: 30 }));
        // minutes.length == 24; // true
        setDurHours(minutes);
    }, []);
    if (experts === null || experts === 0 || experts === undefined) {
        return <div className="text-2xl text-center">Loading.....</div>;
    } else {
        return (
            <div className="px-5 py-12">
                <div className="text-center mb-5">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                        Book Form
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                        Please fill the fields below.
                    </p>
                    <div className="flex mt-3 justify-center">
                        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                    </div>
                </div>
                <div className="w-full max-w-md mx-auto">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="expert"
                            >
                                Select Expert:
                            </label>
                            <div className="inline-block relative w-full">
                                <select
                                    id="expert"
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    {experts.map(expert => (
                                        <React.Fragment key={expert.id}>
                                            <option value={expert.id}>
                                                {expert.name}
                                            </option>
                                        </React.Fragment>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="text"
                            >
                                Full Name:
                            </label>
                            <input
                                type="text"
                                id="text"
                                name="text"
                                className="w-full block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="date"
                            >
                                Pick Date:
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="duration"
                            >
                                Select Duration:
                            </label>
                            <div className="inline-block relative w-full">
                                <select
                                    id="duration"
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="15">15 mins</option>
                                    <option value="30">30 mins</option>
                                    <option value="45">45 mins</option>
                                    <option value="1">1 hour</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="available_hours"
                            >
                                Available Hours:
                            </label>
                            <div className="inline-block relative w-full">
                                <select
                                    id="available_hours"
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    {durHours &&
                                        durHours.map((m, i, durHours) => {
                                            if (durHours.length - 1 !== i) {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <option>
                                                            {m.format("HH:mm")}
                                                            &nbsp; - &nbsp;
                                                            {durHours[
                                                                i + 1
                                                            ].format("HH:mm")}
                                                        </option>
                                                    </React.Fragment>
                                                );
                                            } else {
                                                return;
                                            }
                                        })}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <button
                                type="submit"
                                className="w-full bg-indigo-700 hover:bg-black text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-200"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
