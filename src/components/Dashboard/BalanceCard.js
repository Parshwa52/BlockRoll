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
        getBal();
    }, [web3, accounts, contract]);

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Current Balance</Title>
            <Typography component="p" variant="h4">
                ₹{balance}
            </Typography>
            <Typography
                color="textSecondary"
                className={classes.depositContext}
            >
                {date.toLocaleString()}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    reedeem tokens
                </Link>
            </div>
        </React.Fragment>
    );
}
