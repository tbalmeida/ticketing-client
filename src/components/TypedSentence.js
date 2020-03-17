import React from 'react';
import Typed from 'react-typed';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {       
    color: 'green',    
    minHeight: theme.spacing(13),
    marginBottom: theme.spacing(3),    
    [theme.breakpoints.down('sm')]:{
      minHeight: theme.spacing(16),
      fontSize:'1.4rem'
    }  
  }
}));

export default function TypedSentence() {
  const classes = useStyles();

  return (
    
    <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.root}>
        <Typed
            strings={['We want you to check the best Calgary\'s events. ^1000 So we decided to create this site so that you could have an oportunity to visit all of them depending on your interests.']}
            typeSpeed={80}
            backSpeed={70}
            backDelay={5000}
            smartBackspace={true}
            fadeOut={true}
            fadeOutDelay={2000}
            shuffle={true}
            loop
        /> 
    </Typography>    
  )
}