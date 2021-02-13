import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {getpayRate,getDuration,getOriginalPayment,getLeavesCost,getDelayCost} from './utils'

// This is the blockchain object we receive using web3
const APIobject = 100;

const products = [
    { name: 'PayRate', desc: 'Payment Rate',color : 'green', price: getpayRate(APIobject) },
    { name: 'Duration', desc: 'Duration of Task',color : 'green', price: getDuration(APIobject) },
    { name: 'OriginalPayment', desc: 'Payment', color : 'green',price: getOriginalPayment(APIobject) },
    { name: 'Leaves Cost', desc: 'Amount deducted for leaves',color : 'red', price: getLeavesCost(APIobject) },
    { name: 'Delay Cost', desc: 'Amount deducted for delays', color : 'red',price: getDelayCost(APIobject) },
];

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

function Textcoloroutput(props){
    return(
        <Typography variant="body2">1</Typography>
    )
};

export default function Review() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Transaction Summary
      </Typography>
            <List disablePadding>
                
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        {product.color === 'red'}
                        <Typography color = "red" variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}

                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        $34.06
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
