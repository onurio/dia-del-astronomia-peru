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
    maxWidth: 1000,
    minHeight: 400,
  },
  input: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    // maxWidth: 300,
  },
  answer: {
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  answersHeader: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  qInput: {
    margin: '20px 20px',
    width: '100%',
  },
  accordion: {
    width: '90%',
    marginBottom: 20,
  },
}));

const initialQ = {
  q: 'question?',
  a: [],
};

export default function EditTrivia({ questions, onCancel, onSave }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
  const [currentQuestions, setCurrentQuestions] = useState([...questions]);

  const handleChange = (e) => {
    setCurrentQuestions((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const changeQuestion = (e) => {
    e.preventDefault();
    setCurrentQuestions((s) => {
      const qs = [...s];
      qs[e.target.name].q = e.target.value;
      return qs;
    });
  };

  const addQuestion = () => {
    setCurrentQuestions((s) => [...s, { ...initialQ }]);
  };

  const onQDelete = (index) => {
    setCurrentQuestions((s) => {
      const qs = [...s];
      qs.splice(index, 1);
      return qs;
    });
  };

  const addAnswer = (qIndex) => {
    setCurrentQuestions((s) => {
      const qs = [...s];
      qs[qIndex].a.push({ text: '', isCorrect: false });
      return qs;
    });
  };

  const chooseAnswer = (qIndex, aIndex) => {
    setCurrentQuestions((s) => {
      const qs = [...s];
      let answers = qs[qIndex].a.map((a) => {
        const answer = { ...a, isCorrect: false };
        return answer;
      });
      answers[aIndex].isCorrect = true;
      qs[qIndex].a = answers;
      return qs;
    });
  };

  const onADelete = (qIndex, aIndex) => {
    setCurrentQuestions((s) => {
      const qs = [...s];

      qs[qIndex].a.splice(aIndex, 1);
      return qs;
    });
  };

  const changeAnswer = (qIndex, aIndex, val) => {
    setCurrentQuestions((s) => {
      const qs = [...s];
      qs[qIndex].a[aIndex].text = val;
      return qs;
    });
  };
  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Trivia</Typography>
      </Grid>
      <Grid item xs={12}>
        {currentQuestions.map((question, qIndex) => (
          <Grid
            container
            xs={12}
            key={question.q}
            alignItems="flex-start"
            direction="row"
          >
            <Accordion
              expanded={qIndex === expanded}
              className={classes.accordion}
              onChange={(e) =>
                setExpanded((s) => (s !== qIndex ? qIndex : undefined))
              }
              elevation={3}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <b>
                    Question {qIndex}: {question.q}
                  </b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3} xs={12}>
                  <TextField
                    className={classes.qInput}
                    name={qIndex}
                    onBlur={changeQuestion}
                    variant="outlined"
                    defaultValue={question.q}
                  />
                  <Typography className={classes.answersHeader}>
                    Answers
                  </Typography>
                  {question.a.map((a, aIndex) => (
                    <Grid item xs={12} key={a.text + aIndex}>
                      <Paper className={classes.answer} elevation={2}>
                        <IconButton onClick={() => onADelete(qIndex, aIndex)}>
                          <Delete />
                        </IconButton>
                        <TextField
                          variant="outlined"
                          onBlur={(e) =>
                            changeAnswer(qIndex, aIndex, e.target.value)
                          }
                          className={classes.input}
                          name={aIndex}
                          defaultValue={a.text}
                        />
                        <Checkbox
                          onClick={() => chooseAnswer(qIndex, aIndex)}
                          checked={a.isCorrect}
                          color="primary"
                          inputProps={{
                            'aria-label': 'checkbox with default color',
                          }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                  <IconButton onClick={() => addAnswer(qIndex)}>
                    <Add />
                  </IconButton>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <IconButton onClick={() => onQDelete(qIndex)}>
              <Delete />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={12} justify="center">
          <IconButton onClick={addQuestion}>
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
          onClick={() => onSave(currentQuestions)}
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

EditTrivia.propTypes = {
  questions: PropTypes.array,
};

EditTrivia.defaultProps = {
  questions: [],
};
