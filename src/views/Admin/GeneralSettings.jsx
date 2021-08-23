import {
  Box,
  Button,
  makeStyles,
  Paper,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ChipsArray from './components/ChipArray';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  hoursContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // maxWidth: 500,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fullWidth: {
    width: '100%',
    margin: 10,
  },
  title: {
    marginBottom: 15,
  },
}));

export default function GeneralSettings({ db }) {
  const classes = useStyles();

  const [liveLink, setLiveLink] = useState();
  const [ticketLink, setTicketLink] = useState();
  const [brochureLink, setBrochureLink] = useState();

  const onLiveLinkSave = () => {
    db.collection('generalData').doc('liveLink').set({
      data: liveLink,
    });
  };

  const onTicketLinkSave = () => {
    db.collection('generalData').doc('ticketLink').set({
      data: ticketLink,
    });
  };

  const onBrochureLinkSave = () => {
    db.collection('generalData').doc('brochureLink').set({
      data: brochureLink,
    });
  };

  const getLiveLink = () => {
    db.collection('generalData')
      .doc('liveLink')
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setLiveLink(doc.data().data);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting live link:', error);
      });
  };

  const getBrochureLink = () => {
    db.collection('generalData')
      .doc('brochureLink')
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setBrochureLink(doc.data().data);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting live link:', error);
      });
  };

  const getTicketLink = () => {
    db.collection('generalData')
      .doc('ticketLink')
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setTicketLink(doc.data().data);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting live link:', error);
      });
  };

  useEffect(() => {
    getLiveLink();
    getTicketLink();
    getBrochureLink();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">General Settings</Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper className={[classes.hoursContainer, classes.paper]}>
            <Typography className={classes.title} variant="h4">
              Live Link
            </Typography>
            <TextField
              variant="outlined"
              multiline
              onChange={(e) => setLiveLink(e.target.value)}
              value={liveLink}
              placeholder="Link"
              className={classes.fullWidth}
            />
            <Button
              onClick={onLiveLinkSave}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={[classes.hoursContainer, classes.paper]}>
            <Typography className={classes.title} variant="h4">
              Ticket Link
            </Typography>
            <TextField
              variant="outlined"
              multiline
              onChange={(e) => setTicketLink(e.target.value)}
              value={ticketLink}
              placeholder="Link"
              className={classes.fullWidth}
            />
            <Button
              onClick={onTicketLinkSave}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={[classes.hoursContainer, classes.paper]}>
            <Typography className={classes.title} variant="h4">
              Brochure Link
            </Typography>
            <TextField
              variant="outlined"
              multiline
              onChange={(e) => setBrochureLink(e.target.value)}
              value={brochureLink}
              placeholder="Link"
              className={classes.fullWidth}
            />
            <Button
              onClick={onBrochureLinkSave}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

GeneralSettings.propTypes = {
  db: PropTypes.object.isRequired,
};
