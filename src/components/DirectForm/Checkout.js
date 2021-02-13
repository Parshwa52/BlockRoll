import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import BlockchainContext from "../../contexts/BlockChainContext";
import Link from "@material-ui/core/Link";
// custom imports
import { useAddress } from "./utils";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ["Payment details", "Transaction Summary"];

export default function Checkout() {
    const { web3, accounts, contract } = useContext(BlockchainContext);
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [username, address, setUsername] = useAddress("");
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);

    const sendTokens = async () => {
        setLoading(true);
        try {
            await contract.methods
                .sendtokens(
                    accounts[0],
                    address,
                    amount,
                    new Date().toLocaleString()
                )
                .send({ from: accounts[0] });
        } catch (err) {
            console.log("Error in send tokens");
        }
        setLoading(false);
    };

    const handleNext = () => {
        if (activeStep == 0 && address === "") {
            alert("Enter valid Username");
            return;
        }
        if (activeStep == 0 && amount <= 0) {
            alert("Enter valid Amount");
            return;
        }
        if (activeStep == 1) {
            sendTokens();
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <PaymentForm
                        username={username}
                        address={address}
                        setUsername={setUsername}
                        amount={amount}
                        setAmount={setAmount}
                    />
                );
            case 1:
                return (
                    <Review
                        amount={amount}
                        username={username}
                        address={address}
                    />
                );
            default:
                throw new Error("Unknown step");
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        <Link href="/dash">BlockRoll</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Send BlockRolls
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                {loading ? (
                                    "Loading..."
                                ) : (
                                    <>
                                        <Typography variant="h5" gutterBottom>
                                            Transaction Successful
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {amount} tokens have been sent to{" "}
                                            {username} ({address})
                                        </Typography>
                                    </>
                                )}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1
                                            ? "Place order"
                                            : "Next"}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
