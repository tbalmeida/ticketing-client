import React, { useEffect, useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardSection from "./CardSection";
import HomeIcon from "@material-ui/icons/Home";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
// import useStyles from "./EventListStyles.js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { SHOW_ALERT } from "./context/types";
import { AlertContext } from "components/context/alert/alertContext";
import { Alert } from "components/Alert";
import Container from '@material-ui/core/Container';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  marginR: {
      marginRight: 10
  }
});





export function formatPrice(price) {
    return `$${(price / 100).toFixed(2)}`;
}

export function totalPrice(events) {
    return events.reduce((acc, event) => acc + event.quantity * event.price, 0);
}
export default function Cart({ cartItems, updateQuantity, removeCartItems }) {
    console.log("Cart -> cartItems", cartItems)
    const { show, hide } = useContext(AlertContext);

    useEffect(() => {
    if(cartItems.length === 0) {
        show('The cart is empty!', 'danger')
    } 
  }, []);
   
    function totalPrice1(events) {
        return events.reduce((acc, event) => acc + event.quantity * event.price, 0);
    }
    const classes = useStyles();

    return (
        <>
        <Container maxWidth="md">
            <Typography align="center" variant="h4">My Cart</Typography>
            {cartItems.length===0 ? 
            <Container  maxWidth="sm"><Alert/></Container> :
                <TableContainer component={Paper}>
                   <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Event</StyledTableCell> 
                                <StyledTableCell align="right">Event Price</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">Limit per user</StyledTableCell>
                                <StyledTableCell align="right">Subtotal</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map(event => (
                            <StyledTableRow key={event.id}>
                                <StyledTableCell component="th" scope="row">{event.title}</StyledTableCell>
                                <StyledTableCell align="right">{formatPrice(event.price * 100)}</StyledTableCell>
                                <StyledTableCell align="right" style={{ display: "flex" }}>
                                    <Badge max={5}
                                        color="secondary"
                                        badgeContent={event.quantity}
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    <div>
                                        <ButtonGroup>
                                            <Button
                                                size="small"
                                                aria-label="reduce"
                                                onClick={updateQuantity(event.id)}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            {event.quantity}
                                            <Button
                                                size="small"
                                                aria-label="increase"
                                                onClick={updateQuantity(event.id, 1)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                        </StyledTableCell>
                                <StyledTableCell align="right">{event.limit}</StyledTableCell>
                                <StyledTableCell align="right">
                                        {formatPrice(
                                           event.quantity * event.price * 100
                                        )}
                                    </StyledTableCell>
                            </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <StyledTableCell align="right" style={{ textAlign: "right" }} colSpan={4}>
                                    Total Price
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {formatPrice(totalPrice1(cartItems) * 100)}
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                  </Table>
                </TableContainer>}
            </Container>
              <Container style={{margin: "2rem"}} maxWidth="md" align="center">

            <div>
            <Button
                className={classes.marginR}
                variant="outlined"
                size="small"
                color="primary"
                component={Link}
                to={"/"}
                aria-label="delete"
                endIcon={<HomeIcon />}
            >
                Go home
            </Button>
            <Button
                className={classes.marginR}
                variant="outlined"
                size="small"
                color="primary"
                component={Link}
                to={"/checkout"}
                aria-label="delete"
                endIcon={<CreditCardIcon />}
            >
                Checkout
            </Button>
            <Button
                className={classes.margin}
                variant="outlined"
                size="small"
                onClick={removeCartItems}
                color="primary"
                component={Link}
                to={"/"}
                aria-label="delete"
                endIcon={<CreditCardIcon />}
            >
                Clear cart
            </Button>
        </div>
              </Container>  
              </>
            
    )
}
