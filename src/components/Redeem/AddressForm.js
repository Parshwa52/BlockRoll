import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm({addressform,setAddressformState}) {
    
    const handleChange = e =>{
        const value = e.target.value;
        setAddressformState({
            ...addressform,
            [e.target.name] : value
        }); 

        console.log('====================================');
        console.log(addressform);
        console.log('====================================');
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Bank Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="bankName"
                        name="bankName"
                        label="Bank Name"
                        fullWidth
                        onChange = {handleChange}
                        value={addressform.bankName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="AccNo"
                        name="AccNo"
                        label="Account No"
                        fullWidth
                        onChange = {handleChange}
                        value={addressform.AccNo}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
