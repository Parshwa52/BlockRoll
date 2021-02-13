import { useEffect, useState } from "react";

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
