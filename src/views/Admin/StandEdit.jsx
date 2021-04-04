import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Chip,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditWrapper from './components/JoditWrapper';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80vw',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    // maxWidth: 300,
  },
}));

const initialStand = {
  name: '',
  youtubeLink: '',
  instagramLink: '',
  facebookLink: '',
  email: '',
  info: '',
  trivia: [],
  downloads: [],
  workshops: [],
  logo:
    'https://www.nacdnet.org/wp-content/uploads/2016/06/person-placeholder.jpg',
};

export default function StandEdit({ stand, onCancel, onSave }) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(stand !== undefined);
  const [standInfo, setStandInfo] = useState(stand || initialStand);

  const handleChange = (e) => {
    setStandInfo((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">
          {isEdit ? 'Edit stand info' : 'Add stand'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          className={classes.input}
          variant="outlined"
          placeholder="Name"
          value={standInfo.name || ''}
          label="Name"
          name="name"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}></Grid>

      <Grid item xs={3}>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Youtube link"
          value={standInfo.youtubeLink}
          name="youtubeLink"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Instagram link"
          value={standInfo.instagramLink}
          name="instagramLink"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Email"
          value={standInfo.email}
          name="email"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Facebook link"
          value={standInfo.facebookLink}
          name="facebookLink"
          onChange={handleChange}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="artCategory">Art Categories</InputLabel>
          <Select
            labelId="artCategory"
            id="artCategory"
            multiple
            onChange={(e) => {
              setStandInfo((s) => ({ ...s, artCategory: e.target.value }));
            }}
            variant="outlined"
            value={standInfo.artCategory || []}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {artCategories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid> */}
      <Grid item xs={12}>
        <h3>Information</h3>
        {/* <JoditEditor
          value={}
          onChange={}
        /> */}
        <JoditWrapper
          value={standInfo.info || ''}
          onChange={(info) => setStandInfo((s) => ({ ...s, info }))}
        />
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
          onClick={() => onSave(standInfo)}
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

StandEdit.propTypes = {
  stand: PropTypes.object,
};

StandEdit.defaultProps = {
  stand: undefined,
};
