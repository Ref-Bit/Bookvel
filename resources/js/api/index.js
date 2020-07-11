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
            `https://api.ipstack.com/check?access_key=${process.env.MIX_IP_API_KEY}&format=1`
        );

        if (data.length !== 0 || data !== null || data !== undefined) {
            return data;
        } else {
            try {
                const { fall_data } = await axios.get(
                    "https://freegeoip.app/json/"
                );
                return fall_data;
            } catch (error) {
                console.log(`Cannot reach the fallback api...`);
            }
        }
    } catch (error) {
        console.log(`Cannot reach the api...`);
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
