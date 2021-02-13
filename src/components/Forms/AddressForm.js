import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payroll Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="Paymentrate"
                        name="Paymentrate"
                        label="Payment Rate"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="Duration"
                        name="Duration"
                        label="Duration"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="Leaves"
                        name="Leaves"
                        label="Leaves"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="Leavecost"
                        name="Leavecost"
                        label="Leavecost"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="delayeddays"
                        name="delayeddays"
                        label="delayeddays"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="delaycostperday"
                        name="delaycostperday"
                        label="delaycostperday"
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
