import { useEffect, useState } from "react";
const getpayRate = (APIobject) => {
    return 10;
};

const getDuration = (APIobject) => {
    return 10;
};

const getOriginalPayment = (APIobject) => {
    return getpayRate(APIobject) * getDuration(APIobject);
};

const getNumberofLeaves = (APIobject) => {
    return 12;
};

const getSingleLeaveCost = (APIobject) => {
    return 100;
};

const getNumberofDelays = (APIobject) => {
    return 12;
};

const getSingleDelayCost = (APIobject) => {
    return 100;
};
const getLeavesCost = (APIobject) => {
    return getNumberofLeaves(APIobject) * getSingleLeaveCost(APIobject);
};

const getDelayCost = (APIobject) => {
    return getSingleDelayCost(APIobject) * getNumberofDelays(APIobject);
};

const getAddress = (username) => {
    if (username === "rudresh") {
        return "0xF64576D2A1B925964CbE1E4dc45E23185A08E01E";
    }
    return undefined;
};

export const useAddress = (initialUsername) => {
    const [username, setUsername] = useState(initialUsername);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const temp = getAddress(username);
        if (temp) setAddress(temp);
        else setAddress("");
    }, [username]);

    return [username, address, setUsername];
};

export {
    getpayRate,
    getDuration,
    getOriginalPayment,
    getLeavesCost,
    getDelayCost,
};
