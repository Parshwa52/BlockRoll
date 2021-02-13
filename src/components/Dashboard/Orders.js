import React, { useContext, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

import BlockchainContext from "../../contexts/BlockChainContext";
import { useEffect } from "react";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        "16 Mar, 2019",
        "Elvis Presley",
        "Tupelo, MS",
        "VISA ⠀•••• 3719",
        312.44
    ),
    createData(
        1,
        "16 Mar, 2019",
        "Paul McCartney",
        "London, UK",
        "VISA ⠀•••• 2574",
        866.99
    ),
    createData(
        2,
        "16 Mar, 2019",
        "Tom Scholz",
        "Boston, MA",
        "MC ⠀•••• 1253",
        100.81
    ),
    createData(
        3,
        "16 Mar, 2019",
        "Michael Jackson",
        "Gary, IN",
        "AMEX ⠀•••• 2000",
        654.39
    ),
    createData(
        4,
        "15 Mar, 2019",
        "Bruce Springsteen",
        "Long Branch, NJ",
        "VISA ⠀•••• 5919",
        212.79
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {
    const { web3, accounts, contract } = useContext(BlockchainContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getBal = async () => {
            try {
                const counter = await contract.methods.assetCount().call();
                console.log("From orders", counter);
                let trans = [];
                for (let i = 0; i < counter; i++) {
                    const res = await contract.methods.getAsset(i).call();
                    // date, senderAddress, reciverAddress, amount
                    console.log("From orders", res);
                    const currAddr = accounts[0];
                    let type = undefined;
                    let address = undefined;
                    if (currAddr === res[1]) {
                        type = "Debit";
                        address = res[2];
                    } else if (currAddr == res[2]) {
                        type = "Credit";
                        address = res[1];
                    } else {
                        continue;
                    }

                    // get name from web3
                    const name = "dummy";
                    const data = {
                        id: i,
                        date: res[0],
                        type: type,
                        name: name,
                        address: address,
                        amount: res[3],
                    };

                    trans = [...trans, data];
                }
                setTransactions(trans);
            } catch (err) {
                console.log("Somthing went wrong!");
            }
        };
        getBal();
    }, [web3, accounts, contract]);

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Previous Transactions</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((obj) => (
                        <TableRow key={obj.id}>
                            <TableCell>{obj.date}</TableCell>
                            <TableCell>{obj.type}</TableCell>
                            <TableCell>{obj.name}</TableCell>
                            <TableCell>{obj.address}</TableCell>
                            <TableCell align="right">{obj.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more orders
                </Link>
            </div>
        </React.Fragment>
    );
}
