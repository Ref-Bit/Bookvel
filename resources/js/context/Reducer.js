export default (state, action) => {
    switch (action.type) {
        case "GET_IPS":
            return { ...state, ips: action.payload };
        case "SET_IP":
            return { ...state, ip: action.payload };

        default:
            return state;
    }
};
