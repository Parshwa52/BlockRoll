import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import BlockchainContext from "../../contexts/BlockChainContext";

// custom imports
import { useAddress } from "./utils";

const initial_address_form = {
    Paymentrate: undefined,
    Duration: undefined,
    Leaves: undefined,
    Leavecost: undefined,
    delayeddays: undefined,
    delaycostperday: undefined,
};

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

const steps = ["Payment details", "Payroll Details", "Transaction Summary"];

export default function Checkout() {
    const { web3, accounts, contract } = React.useContext(BlockchainContext);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    // add data sates here
    const [username, address, setUsername] = useAddress("");
    const [addressform, setAddressformState] = React.useState(
        initial_address_form
    );

    const doTransaction = async () => {
        setLoading(true);
        try {
            await contract.methods
                .calculatetokens(
                    addressform.Paymentrate,
                    addressform.Duration,
                    addressform.Leaves,
                    addressform.Leavecost,
                    addressform.delayeddays,
                    addressform.delaycostperday,

                    accounts[0],
                    address,
                    new Date().toLocaleString()
                )
                .send({ from: accounts[0] });
            setLoading(false);
        } catch (err) {
            console.log("Error in Checkout.js payroll");
        }
    };

    const handleNext = () => {
        if (activeStep == 0 && address === "") {
            alert("Enter valid Username");
            return;
        }
        if (activeStep == 1) {
            for (let obj in addressform) {
                if (addressform[obj] === undefined || addressform[obj] == "") {
                    alert("Enter all fields");
                    return;
                }
            }
        }
        if (activeStep == 2) {
            doTransaction();
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
                    />
                );
            case 1:
                return (
                    <AddressForm
                        addressform={addressform}
                        setAddressformState={setAddressformState}
                    />
                );
            case 2:
                return (
                    <Review
                        addressform={addressform}
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
                        Transaction
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
                                            Payment Successful.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            4080.00 rupee tokens has been
                                            transferred to Parshwa
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
