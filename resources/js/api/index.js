import axios from "axios";

export const fetchExperts = async () => {
    try {
        const { data } = await axios.get("/api/experts");

        if (data !== null) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchExpert = async id => {
    try {
        const { data } = await axios.get(`/api/experts/${id}`);
        if (data !== null) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchIP = async () => {
    try {
        const { data } = await axios.get(
            "https://cors-anywhere.herokuapp.com/https://freegeoip.app/json"
        );

        if (data.length !== 0 || data !== null || data !== undefined) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchGeoTimezone = async ip => {
    try {
        const { data } = await axios.get(
            `http://worldtimeapi.org/api/ip/${ip}.json`
        );

        if (data !== null) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};
