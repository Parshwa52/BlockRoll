import { useEffect, useState, useContext } from "react";
import BlockchainContext from "../../contexts/BlockChainContext";

export const getTotal = (addressform) => {
    return (
        addressform.Paymentrate * addressform.Duration -
        addressform.Leaves * addressform.Leavecost -
        addressform.delayeddays * addressform.delaycostperday
    );
};

export const useAddress = (initialUsername) => {
    const { web3, accounts, contract } = useContext(BlockchainContext);
    const [username, setUsername] = useState(initialUsername);
    const [address, setAddress] = useState("");

    const getAddress = async (username) => {
        try {
            const address = await contract.methods
                .getidentity(username.toString())
                .call();
            if (address == 0) {
                return undefined;
            }
            return address.toString();
        } catch (err) {
            console.log("Something went wrong in utils.js");
        }
        return undefined;
    };

    useEffect(() => {
        const fun = async () => {
            const temp = await getAddress(username);
            if (temp) setAddress(temp);
            else setAddress("");
        };
        fun();
    }, [username]);

    return [username, address, setUsername];
};
