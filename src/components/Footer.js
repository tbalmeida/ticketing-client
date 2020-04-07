
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({  //creating function that's using styles 
  root: {    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',       
    width: '100%',
    height: '10vh',
},
});
function Copyright() {
   //will be rendered
  return (
    <div id="footerWrapper">
      <Box style={{padding: '0 5rem'}}>
    <Typography variant="body2" color="black" align="center">
      <CallIcon fontSize="large"/>
      Call us: +1855555555
    </Typography>
      </Box>
      <Box style={{padding: '0 5rem'}}>
    <Typography variant="body2" color="black" align="center">
      <LocationOnIcon fontSize="large"/>Calgary, Canada
    </Typography >
      </Box>
      <Box style={{padding: '0 5rem'}}>
        
    <Typography variant="body2" color="black" align="center">
    <MailIcon fontSize="large" style={{}}/> ticketing4goog@gmail.com
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
