import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Add, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80vw',
    maxWidth: 600,
    minHeight: 400,
  },
  input: {
    width: '40%',
    margin: '0 5px',
  },
  paper: {
    padding: 10,
    margin: '5px 0',
    width: '100%',
  },
}));

const initialWorkshop = {
  name: '',
  link: '',
};

export default function EditWorkshops({ workshops, onCancel, onSave }) {
  const classes = useStyles();
  const [currentWorkshops, setCurrentWorkshops] = useState([...workshops]);

  const addWorkshop = () => {
    setCurrentWorkshops((s) => [...s, initialWorkshop]);
  };

  const deleteWorkshop = (index) => {
    setCurrentWorkshops((s) => {
      let state = [...s];
      state.splice(index, 1);
      return state;
    });
  };

  const changeWorkshop = (index, e) => {
    setCurrentWorkshops((s) => {
      let state = [...s];
      state[index][e.target.name] = e.target.value;
      return state;
    });
  };

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Workshops</Typography>
      </Grid>
      <Grid item xs={12}>
        {currentWorkshops.map((workshop, index) => (
          <Grid
            container
            xs={12}
            key={'workshop-' + index}
            alignItems="flex-start"
            direction="row"
          >
            <Paper className={classes.paper}>
              <TextField
                className={classes.input}
                name="name"
                label="Name"
                defaultValue={workshop.name}
                onChange={(e) => changeWorkshop(index, e)}
                variant="outlined"
              />
              <TextField
                className={classes.input}
                name="link"
                label="Link"
                defaultValue={workshop.link}
                onChange={(e) => changeWorkshop(index, e)}
                variant="outlined"
              />
              <IconButton onClick={() => deleteWorkshop(index)}>
                <Delete />
              </IconButton>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} justify="center">
          <IconButton onClick={addWorkshop}>
            <Add />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={6}></Grid>
      <Grid item xs={3}>
        <Button
          onClick={onCancel}
          className={classes.input}
          variant="contained"
        >
          Cancel
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={() => onSave(currentWorkshops)}
          className={classes.input}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

EditWorkshops.propTypes = {
  workshops: PropTypes.array,
};

EditWorkshops.defaultProps = {
  workshops: [],
};
