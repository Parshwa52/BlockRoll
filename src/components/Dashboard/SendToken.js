import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    title: {
        alignItems: "center",
    },
});

export default function SendToken() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title className={classes.title}>Send Tokens</Title>
            <Typography component="p" variant="h4" align="center">
                <Button color="primary">
                    <Link to="/send">Send</Link>
                </Button>
            </Typography>

            <Typography
                color="textSecondary"
                className={classes.depositContext}
            >
                Transfer tokens to your family and friends
            </Typography>
            <div></div>
        </React.Fragment>
    );
}
