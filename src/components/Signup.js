import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AlertContext } from './context/alert/alertContext';
import  { Alert } from './Alert';
import axios from 'axios';
import { postData } from './Login';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';


const useStyles = makeStyles(theme => ({
  paper: {    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '90vh' 
  },
  avatar: {
    marginTop: theme.spacing(9),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(0.5, 0, 0.5),
  }
}));

export default function SignUp() {
  const {show, hide} = useContext(AlertContext);
  const classes = useStyles();
    
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    firstNameText: '',
    lastNameText: '',
    emailText: '',    
    passwordText: '',
    passwordConfirmationText: '',
    checked: false,
    firstNameError: false,
    lastNameError: false,
    emailError: false,    
    passwordError: false,
    passwordConfirmationError: false
    
  })   

  const handleCheckBox = (e) => { //toggles check
    setForm(previouseValues =>(
      {...previouseValues, 
        checked: e.target.checked
      })
    )
  }

  const changeHandler = event => { //updating form and trimming
    setForm({ ...form, [event.target.name]: event.target.value.trim() })
  }  

  const clearForm = () => { //remove all the errors
    setForm(previouseValues =>(
    {...previouseValues, 
      firstNameText: '',
      lastNameText: '',
      emailText: '',     
      passwordText: '',
      passwordConfirmationText: '',
      firstNameError: false,
      lastNameError: false,
      emailError: false,      
      passwordError: false,      
      passwordConfirmationError: false
      })
      )
    hide();
  }    

  const clearData = () => { //clears form and also clears all errors (previous function)
    setForm(previouseValues => (
      { ...previouseValues, 
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        checked: false}))    
    clearForm()       
  }

  const signUpData = (e) =>{
    e.preventDefault();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let dataValid = true

    if (form.checked === false){
      show('Please agree with the terms', 'success');
      dataValid = false;
    }
    
    if (!form.firstName){ 
      setForm(previouseValues => ({ ...previouseValues, firstNameText: "First name required", firstNameError: true}));
      dataValid = false;
    }   
      
    if (!form.lastName){ 
      setForm(previouseValues => ({ ...previouseValues, lastNameText: "Last name required", lastNameError: true}));  
      dataValid = false; 
    }     

    if (!form.email){
      setForm(previouseValues => ({ ...previouseValues, emailText: "Email required", emailError: true})); 
      dataValid = false;    
    } 
    
     if (!form.password){
      setForm(previouseValues => ({ ...previouseValues, passwordText: "Password required", passwordError: true})); 
      dataValid = false;     
    }
     if (form.password.length <=2){
      show('Password is too short', 'danger')
      setForm(previouseValues => ({ ...previouseValues, passwordError: true})); 
      dataValid = false;     
    }
    
    if (!form.passwordConfirmation){
      setForm(previouseValues => ({ ...previouseValues, passwordConfirmationText: "Password confirmation required", passwordConfirmationError: true})); 
      dataValid = false;      
    }

    if (form.password !== form.passwordConfirmation){
      show("Please check that password and password confirmation are the same", 'danger')
      setForm(previouseValues => ({ ...previouseValues, passwordError: true, passwordConfirmationError: true})); 
      dataValid = false;
    }

    if (!re.test(form.email.toLowerCase())){
        setForm(previouseValues => ({ ...previouseValues, emailText: "Email format is incorrect", emailError: true}));
        dataValid = false;    
      }     
     
    const userData = {
      'first_name':form.firstName.trim(),
      'last_name':form.lastName.trim(),
      'email':form.email.trim(),
      'password':form.password.trim()
    }      

    if (dataValid === true){ 
      postData('/signup', userData )
              .then(response => {                  
              console.log("signUpData -> response", response.data)
              // sessionStorage.setItem('userId', response.data[0].id);   //creating a new user with key userId and value responce.bla.bla
              sessionStorage.setItem('uName', `${userData.first_name} ${userData.last_name}`); 
              // sessionStorage.setItem('uEmail', `${response.data[0].email}`);
              sessionStorage.setItem('uEmail', `${userData.email}`); 
              sessionStorage.setItem('userId', `${response.data[0].handle}`); 
              window.location.reload();              
              })
              .catch(error => {                                       
                show('Something went wrong', 'danger');   
                console.log('the following error occurred', error)                 
              }) 
           }      
    }    

  return (   
      <Container component="main" maxWidth="xs" >        
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyRoundedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={signUpData}>
          <Alert />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  value={form.firstName}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"                                
                  onChange={changeHandler}
                  autoFocus
                  helperText={form.firstNameText}
                  error={form.firstNameError}
                  onFocus={clearForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  value={form.lastName}
                  label="Last Name"                 
                  onChange={changeHandler}
                  name="lastName"  
                  helperText={form.lastNameText}  
                  error={form.lastNameError}  
                  onFocus={clearForm}          
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  value={form.email}
                  label="Email Address"                 
                  value={form.email}
                  onChange={changeHandler}
                  name="email"  
                  helperText={form.emailText}
                  error={form.emailError}  
                  onFocus={clearForm}      
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password should have minimum 3 characters"      value={form.password}             
                  onChange={changeHandler}
                  type="password"
                  id="password" 
                  helperText={form.passwordText} 
                  error={form.passwordError} 
                  onFocus={clearForm}     
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  value={form.passwordConfirmation}  
                  label="Password Confirmation"        
                  onChange={changeHandler}
                  type="password"
                  id="passwordConfirmation" 
                  helperText={form.passwordConfirmationText} 
                  error={form.passwordConfirmationError}   
                  onFocus={clearForm}     
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckBox} required value="allowExtraEmails" color="primary" />}
                  label="I agree with the terms of service"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}               
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"              
              className={classes.submit}
              onClick= {clearData}
              style={{backgroundColor:'grey', outline: 'none'}}
            >
              Clear
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>        
      </Container>    
  );
  }
