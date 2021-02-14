import React, { useContext, useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

import BlockchainContext from "../../contexts/BlockChainContext";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function BalanceCard() {
    const { web3, accounts, contract } = useContext(BlockchainContext);
    const [balance, setBalance] = useState();
    const [date, setDate] = useState(new Date());
    const [employer, setEmployer] = useState(false);

    useEffect(() => {
        const getBal = async () => {
            try {
                const bal = await contract.methods
                    .getBalance(accounts[0])
                    .call();
                setBalance(bal);
                setDate(new Date());
            } catch (err) {
                console.log("Somthing went wrong!");
            }
        };
        const isEmployer = async () => {
            try {
                const tag = await contract.methods
                    .getIdentityType(accounts[0])
                    .call();
                if (tag === "employer") {
                    setEmployer(true);
                    return;
                }
                setEmployer(false);
            } catch (err) {
                console.log("Somthing went wrong in BalanceCard.js");
            }
        };

        getBal();
        isEmployer();
    }, [web3, accounts, contract]);

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title align="center">Current Balance</Title>
            <Typography component="p" variant="h4" align="center">
                {balance} RT
            </Typography>
            <Typography
                color="textSecondary"
                className={classes.depositContext}
            >
                {date.toLocaleString()}
            </Typography>
            <div>
                {employer ? (
                    <Link color="primary" href="/buytoken">
                        Buy tokens
                    </Link>
                ) : (
                    <Link color="primary" href="redeem">
                      
                    </Link>
                )}
            </div>
        </React.Fragment>
    );
}
