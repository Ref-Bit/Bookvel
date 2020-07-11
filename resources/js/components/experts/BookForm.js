import React, { useState, useEffect, useContext } from "react";
import { fetchExperts, fetchExpert, fetchGeoTimezone } from "../../api";
import { useParams } from "react-router-dom";
import Moment from "moment";
import { extendMoment } from "moment-range";
import Spinner from "../partials/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { GlobalContext } from "../../context/Global";
const moment = extendMoment(Moment);

export default () => {
    let { id } = useParams();
    const { ip } = useContext(GlobalContext);
    const [experts, setExperts] = useState([]);
    const [expert, setExpert] = useState([]);
    const [date, setDate] = useState("");
    const [UserStartDate, setUserStartDate] = useState("");
    const [UserEndDate, setUserEndDate] = useState("");
    const [durations, setDurations] = useState([]);
    const [rangeFactor, setRangeFactor] = useState("hours");
    const [rangeStep, setRangeStep] = useState("1");
    const [userTimezone, setUserTimezone] = useState("");

    const expertChange = e => {
        e.preventDefault();

        fetchExpert(e.target.value)
            .then(data => {
                setExpert(data);
                calDurations(data, rangeFactor, rangeStep, userTimezone);
                document.getElementById("experts").value = data.id;
            })
            .catch(err => console.log(err));
    };

    const durationChange = e => {
        setRangeStep(e.target.value);
        if (
            e.target.value !== "45" &&
            e.target.value !== "30" &&
            e.target.value !== "15"
        ) {
            setRangeFactor("hours");
        } else {
            setRangeFactor("minutes");
        }
        calDurations(expert, rangeFactor, rangeStep, userTimezone);
    };

    const calDurations = (data, r_factor, r_step, u_timezone) => {
        const new_e_st = Date.parse(data.st);
        const new_e_et = Date.parse(data.et);
        const format_options = {
            timeZone: u_timezone,
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        };

        const u_st = new Date(new_e_st).toLocaleString("en-US", format_options);
        const u_et = new Date(new_e_et).toLocaleString("en-US", format_options);

        const range = moment.range(u_st, u_et);
        const ranges = Array.from(range.by(r_factor, { step: r_step }));

        setDurations(ranges);
    };

    function tConvert(time) {
        // Check correct time format and split into components
        time = time
            .toString()
            .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(""); // return adjusted time or original string
    }
    const availableChange = e => {
        let e_val = e.target.value.replace(/\s/g, "");
        let arr_val = e_val.split("-");

        console.log(tConvert(arr_val[0]), tConvert(arr_val[1]));

        setUserStartDate(tConvert(arr_val[0]));
        setUserEndDate(tConvert(arr_val[1]));
    };

    const notify = () => {
        if (
            document.getElementById("experts").value !== "" &&
            document.getElementById("username").value !== "" &&
            document.getElementById("date").value !== "" &&
            document.getElementById("duration").value !== "" &&
            document.getElementById("available_hours").value !== ""
        ) {
            toast(
                `Your apponitment will be on ${date} from ${UserStartDate} to ${UserEndDate}`
            );
            document.getElementById("book_form").reset();
        } else {
            alert("Please Fill the empty fields");
        }
    };

    useEffect(() => {
        fetchExperts()
            .then(data => {
                setExperts(data);
            })
            .catch(err => console.log(err));
        fetchExpert(id)
            .then(data => {
                setExpert(data);
                calDurations(data, rangeFactor, rangeStep, userTimezone);
                document.getElementById("experts").value = data.id;
            })
            .catch(err => console.log(err));
        fetchGeoTimezone(ip)
            .then(data => {
                console.log(`Form: ${data.timezone}`, `IP: ${ip}`);
                setUserTimezone(data.timezone);
            })
            .catch(err => console.log(err));
    }, [ip, userTimezone, rangeFactor, rangeStep]);

    if (experts === null || experts.length === 0 || experts === undefined)
        return <Spinner />;
    else {
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
                    <form
                        id="book_form"
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="experts"
                            >
                                Experts:
                            </label>
                            <div className="inline-block relative w-full">
                                <select
                                    onChange={expertChange}
                                    id="experts"
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option defaultValue>Select Expert:</option>
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
                                htmlFor="username"
                            >
                                Full Name:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="date"
                            >
                                Date:
                            </label>
                            <input
                                onChange={e => {
                                    setDate(
                                        Moment(e.target.value).format(
                                            "MMM Do YYYY"
                                        )
                                    );
                                }}
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
                                Duration:
                            </label>
                            <div className="inline-block relative w-full">
                                <select
                                    onChange={durationChange}
                                    id="duration"
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option defaultValue>
                                        Select Duration:
                                    </option>
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
                                Available Hours (User Timezone):
                            </label>
                            <div className="inline-block relative w-full">
                                <select
                                    onChange={availableChange}
                                    id="available_hours"
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option defaultValue>Select Date:</option>
                                    {durations &&
                                        durations.map((m, i, durations) => {
                                            if (durations.length - 1 !== i) {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <option>
                                                            {m.format("HH:mm")}
                                                            &nbsp; - &nbsp;
                                                            {durations[
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
                                onClick={notify}
                                type="button"
                                className="w-full bg-indigo-700 hover:bg-black text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-200"
                            >
                                Submit
                            </button>
                            <ToastContainer />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};
