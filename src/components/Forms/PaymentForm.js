import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function PaymentForm({ username, address, setUsername }) {
    const [error, setError] = useState(false);
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        error={address === ""}
                        id="address"
                        label="Account Address"
                        variant="filled"
                        placeholder="Enter Valid username"
                        value={address}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        value={username}
                        onChange={onUsernameChange}
                        fullWidth
                        autoComplete="cc-name"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
