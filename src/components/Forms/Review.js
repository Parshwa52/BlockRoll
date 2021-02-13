import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {getTotal} from './utils'

// This is the blockchain object we receive using web3
const APIobject = 100;

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: "Mr John Smith" },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

const RedTextTypography = withStyles({
    root: {
      color: "red"
    }
  })(Typography);

const GreenTextTypography = withStyles({
    root: {
        color: "green"
    }
})(Typography);

const DesiredTypography = (props) =>{
    var result;

    if(props.color === 'red'){
        result = <RedTextTypography> -{props.value} </RedTextTypography>
    }

    else{
        result = <GreenTextTypography> +{props.value} </GreenTextTypography>
    }

    return result;
};

export default function Review({addressform}) {
    const classes = useStyles();
    const temp = "dfrgt";

    const products = [
        { name: 'PayRate', desc: 'Payment Rate',color : 'green', price: addressform.Paymentrate },
        { name: 'Duration', desc: 'Duration of Task',color : 'green', price: addressform.Duration },
        { name: 'OriginalPayment', desc: 'Payment', color : 'green',price: addressform.Paymentrate * addressform.Duration },
        { name: 'Leaves Cost', desc: 'Amount deducted for leaves',color : 'red', price: addressform.Leaves * addressform.Leavecost},
        { name: 'Delay Cost', desc: 'Amount deducted for delays', color : 'red',price:addressform.delayeddays * addressform.delaycostperday },
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Transaction Summary
      </Typography>
            <List disablePadding>
                
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <DesiredTypography color={product.color} value = {product.price}></DesiredTypography>
                    </ListItem>
                ))}

                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {getTotal(addressform)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(", ")}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.detail}
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
