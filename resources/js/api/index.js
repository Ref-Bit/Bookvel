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
            `https://ipapi.co/json/`
            // `http://api.ipstack.com/check?access_key=${process.env.MIX_IP_API_KEY}&format=1`
        );
        console.log(data);

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
            `https://api.ipgeolocation.io/timezone?apiKey=${process.env.MIX_GEO_API_KEY}&ip=${ip}&lang=cn`
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
