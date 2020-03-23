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
            strings={['Here you can find tickets to our events. ^1000 Some events have free admission and others are paid. ^1000 All revenue is directed to our mission to help the community of Calgary. ^1000 Come with us to grow, support your fellows Calgarians and meet awesome people while doing it.']}
            typeSpeed={90}
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