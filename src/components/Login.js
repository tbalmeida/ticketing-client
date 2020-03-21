import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  {Alert} from './Alert';
import {AlertContext} from './context/alert/alertContext';
import axios from 'axios';

export function postData(url, data) {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/1.0${url}`, data)
}

const useStyles = makeStyles(theme => ({ //we take in theme because we need to change one
  paper: {    
    display: 'flex',
    flexDirection: 'column',    
    alignItems: 'center',        
    minHeight: '90vh'    
  },
  avatar: { 
    marginTop: theme.spacing(18),   
    backgroundColor: theme.palette.secondary.main,
    margin: 'auto',
    marginBottom: '10px'
  },  
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0.5, 0, 0.5),
  },  
  clear: {
    margin: theme.spacing(0.5, 0, 0.5),
    backgroundColor:'grey',
    outline: 'none'
  }
}));

export const Login = () => { 
  
  const [form, setForm] = useState({  //alternative to use useReducer or Redux
    email: '', 
    password: '',
    emailError: false,
    passwordError: false,
    emailHelperText:'',
    passwordHelperText:'',    
  }) 
  
  const changeHandler = event => {  //will be used later as onChange method while rendering
    setForm({ ...form, [event.target.name]: event.target.value }) //form is our state and it changes everything, event.target.name = name, email etc
  }
  
  const classes = useStyles();
  const {show, hide} = useContext(AlertContext); //use context again
  
  const loginValidation = e => {
    let dataValid = true;
    e.preventDefault(); //prevents submit of this form
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  //checks email   
    if (!form.email){       
      setForm(previouseValues => ({ ...previouseValues, emailHelperText: "Email required", emailError: true }));
      dataValid = false;           
    } 

    if (!form.password){      
    setForm(previouseValues => ({ ...previouseValues, passwordHelperText: "Password required", passwordError: true }))
    dataValid = false;        
    }  

    if (form.email && !re.test(form.email.toLowerCase())){
      setForm(previouseValues =>({ ...previouseValues, emailHelperText: "Email format is incorrect",emailError: true}));   
      dataValid = false;     
    } 

    const userData = { //checking for whitespaces
      'email':form.email.trim(),
      'password':form.password.trim()
    }
   
    if (dataValid){
    postData('/login', userData )
    .then(response => {     
      console.log("Login -> response.data[0]", response.data[0])
      sessionStorage.setItem('userId', response.data[0].handle);   //creating a new user with key userId and value responce.bla.bla
      sessionStorage.setItem('uName', `${response.data[0].first_name} ${response.data[0].last_name}`); 
      sessionStorage.setItem('uEmail', `${response.data[0].email}`); 
      // sessionStorage.setItem('handle', `${response.data[0].handle}`); 
      window.location.reload();     
    })
    .catch(error => {        
      show(error.response.data.message, 'danger');  //use alert context with danger class     
      // console.log('the following error occurred', error)   
    })
  } 
  }   
  
  const clearForm = () => { //we do that if we have errors while filling out form and then if you move on focus some input then it removes errors, warnings etc
    setForm(previouseValues =>({...previouseValues, emailHelperText: "",passwordHelperText:"", emailError: false, passwordError: false, loginDataValid: true}))  
    hide();
  }

  const clearData = () => {  // removes all fields 
    setForm(previouseValues => ({ ...previouseValues, email: "", password: ""}))    
    clearForm();    
  }  
  
  return (
    <Box className={classes.paper}>
      <Container component="main" maxWidth="xs" >        
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" align='center' variant="h5">
            Sign in
          </Typography>
          <Alert />
          <form className={classes.form} noValidate onSubmit={loginValidation}> 
            <TextField
              variant="outlined"
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
            <TextField
              variant="outlined"
              margin="normal"
              value={form.password}
              required 
              // { /* if we do required then we may not need validation function above */ }
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changeHandler}
              onFocus={clearForm}              
              error={form.passwordError}
              helperText={form.passwordHelperText}              
              />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}              
            >
              Sign In
            </Button>

            <Button
              type="button"
              fullWidth
              variant="contained"              
              className={classes.clear}
              onClick= {clearData}              
              >
              Clear
            </Button>
            <Grid container>
              <Grid item xs>                
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>        
      </Container>
    </Box>
  );
} 







// *** Old version ***
// import { Form, Input, Button, Checkbox } from 'antd';
// import React from 'react';

// const layout = {
//     labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// const validateMessages = {
//     required: 'This field is required!',
//     types: {
//       email: 'Not a validate email!',
//       number: 'Not a validate number!',
//     },
//     number: {
//       range: 'Must be between ${min} and ${max}',
//     },
//   };
// export const Login = () => {
//   const onFinish = values => {
//     console.log('Success:', values);
//   };

//   const onFinishFailed = errorInfo => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <Form
//       {...layout}
//       name="basic"
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       validateMessages ={validateMessages}
//     >
//       <Form.Item
//         name={['user', 'email']}
//         label="Email"
//         rules={[
//           {
//             type: 'email',
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your password!',
//           },
//         ]}
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item {...tailLayout} name="remember" valuePropName="checked">
//         <Checkbox>Remember me</Checkbox>
//       </Form.Item>

//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };
// // export default Login;