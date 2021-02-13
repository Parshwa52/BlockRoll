import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm({ addressform, setAddressformState }) {
    const handleChange = (e) => {
        const value = e.target.value;
        setAddressformState({
            ...addressform,
            [e.target.name]: value,
        });
    };

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
                        type="number"
                        fullWidth
                        onChange={handleChange}
                        value={addressform.Paymentrate}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="Duration"
                        name="Duration"
                        label="Duration"
                        type="number"
                        fullWidth
                        onChange={handleChange}
                        value={addressform.Duration}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="Leaves"
                        name="Leaves"
                        label="Leaves"
                        type="number"
                        fullWidth
                        onChange={handleChange}
                        value={addressform.Leaves}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="Leavecost"
                        name="Leavecost"
                        label="Leavecost"
                        type="number"
                        required
                        fullWidth
                        value={addressform.Leavecost}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="delayeddays"
                        name="delayeddays"
                        label="delayeddays"
                        type="number"
                        fullWidth
                        onChange={handleChange}
                        value={addressform.delayeddays}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="delaycostperday"
                        name="delaycostperday"
                        label="delaycostperday"
                        type="number"
                        fullWidth
                        required
                        onChange={handleChange}
                        value={addressform.delaycostperday}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
