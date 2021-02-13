import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function PaymentForm({ tokens, address, setTokens }) {
    const [error, setError] = useState(false);
    const onTokenChange = (e) => {
        setTokens(e.target.value);
    };
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment Conversion
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        error={address === ""}
                        id="address"
                        variant="filled"
                        placeholder="Enter Valid Token"
                        value={address}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="token"
                        label="token"
                        value={tokens}
                        type="number"
                        onChange={onTokenChange}
                        fullWidth
                        autoComplete="cc-name"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
