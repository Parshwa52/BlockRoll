import { useEffect, useState, useContext } from "react";
import BlockchainContext from "../../contexts/BlockChainContext";

// const getpayRate = (APIobject) => {
//     return 10;
// };

// const getDuration = (APIobject) => {
//     return 10;
// };

// const getOriginalPayment = (APIobject) => {
//     return getpayRate(APIobject) * getDuration(APIobject);
// };

// const getNumberofLeaves = (APIobject) => {
//     return 12;
// };

// const getSingleLeaveCost = (APIobject) => {
//     return 100;
// };

// const getNumberofDelays = (APIobject) => {
//     return 12;
// };

// const getSingleDelayCost = (APIobject) => {
//     return 100;
// };
// const getLeavesCost = (APIobject) => {
//     return getNumberofLeaves(APIobject) * getSingleLeaveCost(APIobject);
// };

// const getDelayCost = (APIobject) => {
//     return getSingleDelayCost(APIobject) * getNumberofDelays(APIobject);
// };

// const getAddress = (username) => {
//     if (username === "rudresh") {
//         return "0xF64576D2A1B925964CbE1E4dc45E23185A08E01E";
//     }
//     return undefined;
// };

// export const getCurrUsername = () => {
//     return "Rudresh";
// };

// export const getCurrAcc = () => {
//     return "0xF64576D2A1B925964CbE1E4dc45E23185A08E01E";
// };

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

// export {
//     getpayRate,
//     getDuration,
//     getOriginalPayment,
//     getLeavesCost,
//     getDelayCost,
// };
