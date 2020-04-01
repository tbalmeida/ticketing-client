
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({  //creating function that's using styles 
  root: {    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',       
    width: '100%',
    height: '10vh'
  }
});

function Copyright() { //will be rendered
  return (
    <div id="footerWrapper">
      <Box style={{padding: '0 5rem'}}>
    <Typography variant="body2" color="black" align="center">
      Our phone number is +1855555555
    </Typography>
      </Box>
      <Box style={{padding: '0 5rem'}}>
    <Typography variant="body2" color="black" align="center">
      {'Copyright © '} Anton and Thiago's <strong>ticketing</strong> incorporation! 
      {new Date().getFullYear()}
      {'.'}
    </Typography >
      </Box>
      <Box style={{padding: '0 5rem'}}>
    <Typography variant="body2" color="black" align="center">
      Email: ticketing4goog@gmail.com
    </Typography>
      </Box>
    </div>
  );
}

export default function LabelBottomNavigation() {
  const classes = useStyles();  

  return (
    <footer className={classes.root}>
      <div maxwidth="xs" >   
          <Copyright />     
      </div >
    </footer>
  );
}
