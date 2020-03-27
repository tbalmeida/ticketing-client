import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "./Alert";
import { AlertContext } from "./context/alert/alertContext";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import { useToasts } from 'react-toast-notifications'

export function postData(url, data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/1.0${url}`, data);
}

const useStyles = makeStyles(theme => ({
    //we take in theme because we need to change one
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh"
    },
    avatar: {
        marginTop: theme.spacing(18),
        backgroundColor: theme.palette.secondary.main,
        margin: "auto",
        marginBottom: "10px"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(0.5, 0, 0.5)
    },
    clear: {
        margin: theme.spacing(0.5, 0, 0.5),
        backgroundColor: "grey",
        outline: "none"
    }
}));

export const Login = () => {
    const { addToast } = useToasts()
  
  const [form, setForm] = useState({
    //alternative to use useReducer or Redux
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    emailHelperText: "",
    passwordHelperText: ""
  });
  const { show, hide } = useContext(AlertContext); 
  useEffect(() => {
    return hide;
}, [])
  const changeHandler = event => {
    //will be used later as onChange method while rendering
    setForm({ ...form, [event.target.name]: event.target.value }); //form is our state and it changes everything, event.target.name = name, email etc
  };
  
    const handleChange = prop => event => {
        setForm({ ...form, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
        setForm({ ...form, showPassword: !form.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const classes = useStyles();
    //use context again

    const loginValidation = e => {
        let dataValid = true;
        e.preventDefault(); //prevents submit of this form
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //checks email
        if (!form.email) {
            setForm(previouseValues => ({
                ...previouseValues,
                emailHelperText: "Email required",
                emailError: true
            }));
            dataValid = false;
        }

        if (!form.password) {
            setForm(previouseValues => ({
                ...previouseValues,
                passwordHelperText: "Password required",
                passwordError: true
            }));
            dataValid = false;
        }

        if (form.email && !re.test(form.email.toLowerCase())) {
            setForm(previouseValues => ({
                ...previouseValues,
                emailHelperText: "Email format is incorrect",
                emailError: true
            }));
            dataValid = false;
        }

        const userData = {
            //checking for whitespaces
            email: form.email.trim(),
            password: form.password.trim()
        };

        if (dataValid) {
            postData("/login", userData)
                .then(response => {
                    console.log("Login -> response.data[0]", response.data[0]);
                    sessionStorage.setItem("userId", response.data[0].handle); //creating a new user with key userId and value responce.bla.bla
                    sessionStorage.setItem(
                        "uName",
                        `${response.data[0].first_name} ${response.data[0].last_name}`
                    );
                    sessionStorage.setItem(
                        "uEmail",
                        `${response.data[0].email}`
                    );
                    // sessionStorage.setItem('handle', `${response.data[0].handle}`);
                    window.location.reload();
                    // show('the user was successfully logged in', 'success')
                })
                .catch(error => {
                    addToast('Hello world!', {
                        appearance: 'error',
                        autoDismiss: true,
                      })
                    show(error.response.data.message, "danger"); //use alert context with danger class
                    // console.log('the following error occurred', error)
                });
        }
    };

    const clearForm = () => {
        //we do that if we have errors while filling out form and then if you move on focus some input then it removes errors, warnings etc
        setForm(previouseValues => ({
            ...previouseValues,
            emailHelperText: "",
            passwordHelperText: "",
            emailError: false,
            passwordError: false,
            loginDataValid: true
        }));
        hide();
    };

    const clearData = () => {
        // removes all fields
        setForm(previouseValues => ({
            ...previouseValues,
            email: "",
            password: ""
        }));
        clearForm();
    };

    return (
        <Box className={classes.paper}>
            <Container component="main" maxWidth="xs">
                <Avatar className={classes.avatar}>
                    <VpnKeyRoundedIcon />
                </Avatar>
                <Typography component="h1" align="center" variant="h5">
                    Sign in
                </Typography>
                {/* <Toast/> */}
                <Alert />
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={loginValidation}
                >
                    <TextField
                        variant="filled"
                        margin="normal"
                        value={form.email}
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={changeHandler}
                        onFocus={clearForm}
                        error={form.emailError}
                        helperText={form.emailHelperText}
                        autoFocus
                    />
                    <FormControl
                        fullWidth
                        className={clsx(classes.margin, classes.textField)}
                        variant="filled"
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    >
                        <InputLabel htmlFor="password">Password*</InputLabel>
                        <FilledInput
                            id="password"
                            type={form.showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {form.showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        // variant="contained"
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                    <Button
                        type="button"
                        fullWidth
                        // variant="contained"
                        variant="outlined"
                        className={classes.clear}
                        onClick={clearData}
                    >
                        Clear
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
};
