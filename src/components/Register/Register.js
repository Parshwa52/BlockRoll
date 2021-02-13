import React, { useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import sideimage from "../assets/images/f1.jpg";
import { InputLabel, MenuItem, FormControl } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import BlockchainContext from "../../contexts/BlockChainContext";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    image: {
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Register() {
    const { web3, accounts, contract } = useContext(BlockchainContext);

    const initial_state = {
        username: "",
        user_type: "employer",
    };

    const classes = useStyles();
    const [formState, setformState] = React.useState(initial_state);
    const [loading, setLoading] = React.useState(false);
    const [skip, setSkip] = React.useState(false);

    useEffect(() => {
        const doesExists = async () => {
            try {
                const tag = await contract.methods
                    .getIdentityType(accounts[0])
                    .call();

                if (tag && tag !== "") {
                    setSkip(true);
                    console.log("User is already registered");
                    return;
                }
            } catch (err) {
                console.log("Error in register!");
            }
        };
        doesExists();
    }, [web3, accounts, contract]);

    const handleChange = (e) => {
        const value = e.target.value;
        setformState({
            ...formState,
            [e.target.name]: value,
        });
    };

    const addIdentity = async () => {
        setLoading(true);
        try {
            await contract.methods
                .addidentity(
                    formState.username,
                    accounts[0],
                    formState.user_type
                )
                .send({ from: accounts[0] });
        } catch (err) {
            console.log("Error in register");
        }
        setLoading(false);
        setSkip(true);
    };

    const handleClick = (e) => {
        if (formState.username === "" || formState.username == undefined) {
            alert("Enter Valid Username");
            return;
        }
        addIdentity();
    };

    return (
        <Grid container component="main" className={classes.root}>
            {skip ? <Redirect to="/dash" /> : null}
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
                <img
                    src={sideimage}
                    width="100%"
                    height="100%"
                    alt="Side Image"
                ></img>
            </Grid>
            {loading ? (
                "Loading"
            ) : (
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <form className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="Username"
                                label="Username"
                                name="username"
                                onChange={handleChange}
                                value={formState.username}
                            />

                            <br></br>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                    UserType
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formState.user_type}
                                    name="user_type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"employer"}>
                                        Employer
                                    </MenuItem>
                                    <MenuItem value={"freelancer"}>
                                        Freelancer
                                    </MenuItem>
                                    <MenuItem value={"normal"}>Normal</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleClick}
                            >
                                Register
                            </Button>
                            <Box mt={5}></Box>
                        </form>
                    </div>
                </Grid>
            )}
        </Grid>
    );
}

export default Register;
