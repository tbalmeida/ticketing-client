import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './EventListStyles.js';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
// import SimpleDialogDemo from '../../components/openDialog';
import TypeSentence from './TypedSentence';
// import  {Alert} from '../../components/Alert';
// import {AlertContext} from '../../context/alert/alertContext';
// import PropTypes from 'prop-types';
// import UserBadge from '../../components/UserBadge';
import Theatre from "./img/theatre.png"
import Golden from "./img/golden-ticket.png"
// import MechanicCardRating from '../../components/MechanicCardRating';
import classNames from 'classnames';
 
export default function EventList({eventData}) {  
  const [modalOpen, setModalOpen] = useState(false)
  const [EventData, setEventData] = useState({})
  const [select, setSelect] = useState('')
  const [EventsList, setEventsList] = useState('')
  
//   const {show, hide} = useContext(AlertContext);
  const classes = useStyles(); 

  const openModal = (id) => {    
    const filteredEvents = eventData.filter(events=>{
         return events.id === id
    })    
    setEventData(filteredEvents[0])
    setModalOpen(true);
  }

  const closeModal = () => {    
    setModalOpen(false);
  };

//   const mechanicRequest = (mechanic) => {    
//     onRequest();  
//     setMechanicInfo(mechanic)      
//   }

  const selectEvent = (e) => setSelect(e.target.value);
  
  const clearSearch = () => {
    setSelect('');    
  }
    
  useEffect(() => {            
      const filtered = eventData.filter(event => 
        event.title.toLowerCase().search(select.toLowerCase()) !== -1
              
      ); 
      console.log("EventList -> eventData", eventData)
      filtered.length !== 0? setEventsList(filtered) : setEventsList(eventData)  
    //   !select && hide()
    //   select && mechanicList === mechanics && show(' No match found', 'success')                
    },[select, eventData]);    
    
    const userId = sessionStorage.getItem('userId')

  return (
    <Fragment> 
          {/* {eventData.map(event => (
                    <Link to={`events/${event.event_id}`}>
                        <h2>Event {event.event_id}</h2>
                        <p>{event.event_id}</p>   
                        <p>{event.title}</p>   
                        <p>{event.event_description}</p>   
                        <p>{event.event_date}</p>   
                        <p>{event.event_time}</p>   
                        <p>{event.duration}</p>   
                        <p>{event.total_issued}</p>   
                        <p>{event.limit_per_user}</p>   
                        <p>{event.price}</p>   
                        <p>{event.venue_id}</p>   
                        <p>{event.venue_name}</p>   
                        <p>{event.venue_description}</p>   
                        <p>{event.capacity}</p>   
                        <p>{event.fee}</p>   
                        <p>{event.percent_capacity}</p>   
                        <p>{event.max_revenue}</p>   
                        <hr></hr>
                    </Link>
                ))} */}
        


    <div className={classes.heroContent}>
      <Container maxWidth="sm" >      
        <Typography component="h1"  variant="h2" align="center" color="textPrimary" gutterBottom  className={classes.gutterBottom}>
      <img 
      src={Golden} 
      alt="site logo" height={100} margin="1em"/>
          <img 
          src={Theatre} 
          alt="site logo" height={70} />
        </Typography>             
        <TypeSentence /> 
        {/* <Alert />              */}
        <form className="form-inline my-2 my-lg-0">
          <input id="searchEvents" value={select} className="form-control mr-2 mx-sm-auto" onChange={selectEvent} type="search" placeholder="Search for an Event" aria-label="Search" style={{minWidth:'125px', width:'85%'}}/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={clearSearch}>Clear</button>
        </form> 
      </Container>
      {!userId && <div className={classes.loginRequest}>
        Please login or signup to buy an event ticket
      </div>}         
    </div>
        <Divider variant="middle" />       
        <Container className={classes.cardGrid} maxWidth="md">                  
          <Grid container spacing={4}>
            {[...EventsList].map(event => (                            
              <Grid item key={event.event_id} xs={12} sm={6} md={4} >                          
              <Link to={`/event/${event.event_id}`}>
                <Card className={classes.card} onClick={()=><a href="event/1"/>} >           
                  <CardMedia
                    className={classes.cardMedia}
                    // image = {mechanic.avatar}
                    title="Image title"                    
                    />
                  {/* < MechanicCardRating stars={mechanic.avg}/>                */}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h5">
                      {event.title} 
                      {/* {event.event_id} */}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                      {event.event_description} 
                      {/* {event.event_id} */}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">                    
                      Event Fee: {event.fee} 
                    </Typography>                    
                  </CardContent>
                  <div className={classes.buttonStyle}>
                    {/* <CardActions>
                      { userId && mechanic.active && 
                        <Button size="small" color="primary" type="button" onClick={()=>mechanicRequest(mechanic)} style={{cursor:'pointer'}} >
                        Request {mechanic.first_name}
                        </Button> }                             
                      </CardActions>         */}
                    {/* {mechanic.active? <UserBadge /> : 
                    <Typography gutterBottom variant="body1" className={classNames(classes.cardContent,classes.userUnavailableText)} >                    
                    {mechanic.first_name} is currently unavailable 
                  </Typography>}                        */}
                  </div>                                   
                </Card> 
                  </Link>
                {/* { modalOpen &&  */}
            {/* //   <SimpleDialogDemo mechanic={mechanicData} modalOpen={modalOpen} closeModal={closeModal}  */}
            {/* //   onRequest={onRequest}
            //   setMechanicInfo={setMechanicInfo}                 */}
            {/* //     /> }                */}
              </Grid>                                       
            ))}
          </Grid>          
        </Container>          
    </Fragment>
  );
}

// LandingPage.propTypes = {
//   mechanics: PropTypes.array.isRequired,
//   onRequest: PropTypes.func.isRequired,
//   setMechanicInfo: PropTypes.func.isRequired
// }