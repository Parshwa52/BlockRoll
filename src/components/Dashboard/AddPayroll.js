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
});

export default function AddPayroll() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Pay Payroll</Title>
            <Typography component="p" variant="h4">
                <Button color="primary">
                    <Link to="/payroll">Calculate</Link>
                </Button>
            </Typography>

            <Typography
                color="textSecondary"
                className={classes.depositContext}
            >
                Calculate Payroll and Pay your Employees
            </Typography>
            <div></div>
        </React.Fragment>
    );
}
