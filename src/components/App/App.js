import React, { Component, useEffect, useState } from "react";
import "./App.css";
import { Switch as Router_Switch, Route } from "react-router-dom";
import Test from "../Test/Test";
import Dashboard from "../Dashboard/Dashboard";
import Checkout from "../Forms/Checkout";
import Landing from "../Landing/Landing";
import Web3 from "web3";
import freelance from "./../../abis/freelance.json";
import DirectSend from "../DirectForm/Checkout";

import BlockchainContext from "../../contexts/BlockChainContext";

const getWeb3 = async () => {
    let tempWeb3 = undefined;
    if (window.ethereum) {
        tempWeb3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            console.log(tempWeb3);
            //console.log(web3.eth.getAccounts());
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (tempWeb3) {
        tempWeb3 = new Web3(tempWeb3.currentProvider);
        console.log(tempWeb3);
        // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
        console.log(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
    }

    return tempWeb3;
};

const App = () => {
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState();

    useEffect(() => {
        const init = async () => {
            // load web3
            const tempWeb3 = await getWeb3();
            // loadBlockchainData
            const tempAccounts = await tempWeb3.eth.getAccounts();
            const networkId = await tempWeb3.eth.net.getId();
            let freelancecon;

            // window.ethereum.on(
            //     "accountsChanged",
            //     function (accounts) {
            //         // Time to reload your interface with accounts[0]!
            //         this.setState({ account: accounts[0] });
            //     }.bind(this)
            // );

            // console.log(tempWeb3);
            // console.log(tempAccounts);
            // //
            // console.log(networkId);
            // console.log(freelance);

            const networkdata = freelance.networks[networkId];
            console.log(networkdata);
            if (networkdata) {
                const abi = freelance.abi;
                //console.log(freelance.abi);
                freelancecon = new tempWeb3.eth.Contract(
                    abi,
                    networkdata.address
                );

                // console.log(freelancecon);
            }

            // saving this to states
            setWeb3(tempWeb3);
            setAccounts(tempAccounts);
            setContract(freelancecon);
            // console.log(tempWeb3, tempAccounts, freelancecon);
        };

        init();
    }, []);

    useEffect(() => {
        const verify = async () => {
            if (
                typeof web3 !== "undefined" &&
                typeof accounts !== "undefined" &&
                typeof contract !== "undefined"
            ) {
                const balance = await contract.methods
                    .getBalance("0x3b30E9372350A7f8B221e5822652bf1e2dAfe85A")
                    .call();
                console.log(balance);
            }
        };
        verify();
    }, [web3, accounts, contract]);

    return (
        <div>
            <BlockchainContext.Provider value={{ web3, accounts, contract }}>
                <React.Fragment>
                    <Router_Switch>
                        <Route path="/" component={Landing} exact />
                        <Route path="/test/" component={Test} />
                        <Route path="/dash/" component={Dashboard} />
                        <Route path="/payroll/" component={Checkout} />
                        <Route path="/send/" component={DirectSend} />
                    </Router_Switch>
                </React.Fragment>
            </BlockchainContext.Provider>
        </div>
    );
};

export default App;
