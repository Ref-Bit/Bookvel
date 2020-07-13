import React, { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import { ips } from "../data.json";
import { fetchIP, fetchGeoTimezone } from "../api";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    // Initial State
    const initialState = {
        ips: [],
        ip: "",
        timezone: ""
    };

    const [state, dispatch] = useReducer(Reducer, initialState);

    // Actions
    function fetchIps(ips) {
        dispatch({
            type: "GET_IPS",
            payload: ips
        });
    }
    function setIP(ip) {
        dispatch({
            type: "SET_IP",
            payload: ip
        });
    }
    function setTimezone(timezone) {
        dispatch({
            type: "SET_TIMEZONE",
            payload: timezone
        });
    }

    useEffect(() => {
        /* GET IPS */
        fetchIps(ips);

        /* GET USER IP */
        fetchIP()
            .then(data => {
                setIP(data.ip);
                fetchGeoTimezone(data.ip)
                    .then(data => {
                        setTimezone(data.timezone);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                ips: state.ips,
                ip: state.ip,
                setIP
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
