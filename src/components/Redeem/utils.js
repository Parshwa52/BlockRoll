import { useEffect, useState } from "react";

export const getTotal = (addressform) =>{
    return addressform.Paymentrate * addressform.Duration - addressform.Leaves * addressform.Leavecost - addressform.delayeddays * addressform.delaycostperday;
}

const getAddress = (username) => {
    if (username === "10") {
        return "1000";
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
