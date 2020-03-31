
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({  //creating function that's using styles 
  root: {    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',       
    width: '100%',
    height: '10vh'
  }
});

function Copyright() { //will be rendered
  return (
    <Typography variant="body2" color="black" align="center">
      {'Copyright © '} Anton and Thiago's <strong>ticketing</strong> incorporation! 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
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
