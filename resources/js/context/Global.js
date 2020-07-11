import React, { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
import { ips } from "../data.json";
import { fetchIP } from "../api";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    // Initial State
    const initialState = {
        ips: [],
        ip: ""
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

    useEffect(() => {
        /* GET IPS */
        fetchIps(ips);

        /* GET USER IP */
        fetchIP()
            .then(data => {
                setIP(data.ip);
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
