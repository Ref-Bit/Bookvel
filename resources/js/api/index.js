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
            "http://api.ipstack.com/check?access_key=50d02c3b0b49cab5081193e999a7e1b7&format=1"
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
            `https://api.ipgeolocation.io/timezone?apiKey=5f5fd38f997c448cb21d65e27cf6a588&ip=${ip}&lang=cn`
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
