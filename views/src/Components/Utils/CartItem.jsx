import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


const useStyles = makeStyles((theme) => ({
    root: {
    //   display: 'flex',
    },
    details: {
    //   display: 'flex',
    //   flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 100,
      height:100
    },
    controls: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   paddingLeft: theme.spacing(1),
    //   paddingBottom: theme.spacing(1),
    },
    playIcon: {
    //   height: 38,
    //   width: 38,
    },
  }));
  

const CartItem = ()=>{

    const classes = useStyles();
    const theme = useTheme();
    return ( 
        <Card className={classes.root}>

                <CardMedia
            className={classes.cover}
            image="https://mrpg.scene7.com/is/image/MRP/01_2130416253_SI_00?$preset$&wid=240"
            title="Live from space album cover"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Mac Miller
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="previous">
                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton>
            </div>
          </div>
      
        </Card>);
}

export default CartItem;