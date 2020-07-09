import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/Global";
import Spinner from "./Spinner";

export default function NavBar() {
    const { ips } = useContext(GlobalContext);
    const { setIP } = useContext(GlobalContext);

    if (ips === undefined || ips === null || ips.length === 0)
        return <Spinner />;
    else {
        return (
            <React.Fragment>
                <nav className="flex items-baseline justify-between flex-wrap bg-indigo-700 p-6 mb-5">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <span
                            className="font-semibold text-4xl tracking-tight"
                            id="logo"
                        >
                            BookVel
                        </span>
                    </div>
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-lg lg:flex-grow">
                            <NavLink
                                to="/experts"
                                activeClassName="active"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4 transition duration-300 font-semibold"
                            >
                                Experts
                            </NavLink>
                            <NavLink
                                to="/book"
                                activeClassName="active"
                                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4 transition duration-300 font-semibold"
                            >
                                Consult Now
                            </NavLink>
                        </div>
                        <div className="group inline-block z-10">
                            <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center w-40">
                                <span className="pr-1 font-semibold flex-1">
                                    User Location:
                                </span>
                                <span>
                                    <svg
                                        className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-300 ease-in-out"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </span>
                            </button>
                            <div className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-300 ease-in-out origin-top w-40">
                                {ips.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <button
                                            className="block w-full rounded-sm px-3 py-1 hover:bg-gray-100"
                                            value={item.ip_address}
                                            onClick={e => setIP(e.target.value)}
                                        >
                                            {item.location}
                                        </button>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
