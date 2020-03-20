import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useStyles from './EventListStyles.js';

export const getEventFromEventsByEventId = (eventId, events) => {
  return events.find(event => event.event_id === eventId)
}

export default function EventInfo({ addToCart, events, location, match }) {
    const classes = useStyles();
    
        // if the component is loaded as a result of user clicking on an event from the home page
          // props.location.state should exist
          // otherwise event is looked up from the events array with props.match.params.id
        const event = location && location.state ?
          location.state :
          getEventFromEventsByEventId(match.params.id, events);
        return (
        <>
        <h1>Event Info page</h1>
        <Grid item key={event.event_id} xs={12} sm={6} md={4} >
              <Link to={`/event/${event.event_id}`}>
                <Card className={classes.card} >           
                  {/* <CardMedia
                    className={classes.cardMedia}
                    // image = {mechanic.avatar}
                    title="Image title"                    
                /> */}
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
        <div>
            <button><Link to='/'>
                Go Home
            </Link>
            </button>
            <button><Link to='/cart'>
                Go to cart
            </Link>
            </button>
            <button onClick={() => addToCart(event.event_id)}>Add to Cart</button>
        </div>
        </>

    )
}

