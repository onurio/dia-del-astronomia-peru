import React, { createContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '90%',
    margin: '0 auto',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,0.8)',
    border: '2px solid #75C5BD',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: 550,
    },
    maxWidth: '100vw',
    padding: '0 20px 0 20px',
    overflowY: 'auto',
    maxHeight: '100%',
    minHeight: 400,
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 999,
  },
  back: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 999,
  },
}));

export const ModalContext = createContext();

export default function FrontModal({ fx, children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [options, setOptions] = useState({});

  const handleModal = (comp, newOptions = {}) => {
    setOptions(newOptions);
    fx('interface');
    if (comp) {
      if (comp !== 'keep') {
        setOpen(true);
        setContent(comp);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <ModalContext.Provider value={handleModal}>
        {children}
      </ModalContext.Provider>
      <Modal
        className={`${classes.modal} front-modal`}
        open={open}
        closeAfterTransition
        onClose={() => setOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton onClick={() => handleModal()} className={classes.close}>
              <CloseIcon color="secondary" />
            </IconButton>
            {options.onBack && (
              <IconButton
                onClick={options.onBack}
                className={classes.back}
                color="secondary"
              >
                <ArrowBack color="secondary" />
              </IconButton>
            )}
            {content}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
