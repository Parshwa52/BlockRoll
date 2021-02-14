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

const INIT_DATA = {
    bankName: undefined,
    AccNo: undefined,
};

const initial_address_form = {
    bankName: "",
    AccNo: "",
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

const steps = ["Buy Tokens"];

export default function Checkout() {
    const { web3, accounts, contract } = React.useContext(BlockchainContext);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    // add data sates here
    const [formData, setFormData] = React.useState(INIT_DATA);
    const [tokens, setTokens] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);

    const buyToken = async () => {
        setLoading(true);
        try {
            const tokenPrice = await contract.methods.tokenPrice().call();
            const tipAmount = tokenPrice * tokens;
            await contract.methods
                .buyTokens(tokens)
                .send({ from: accounts[0], value: tipAmount });
        } catch (err) {
            console.log("Failed while buying token");
        }
        setLoading(false);
    };

    const handleNext = () => {
        if (activeStep == 0) {
            if (tokens == undefined || tokens <= 0) {
                alert("Invalid tokens count");
                return;
            }
            buyToken();
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
                        tokens={tokens}
                        address={accounts[0]}
                        setTokens={setTokens}
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
                        BlockRoll
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
                                            Transaction Successful
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {tokens} have beed added to your
                                            account {accounts[0]}
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
