/* eslint-disable react/display-name */
import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StandEdit from './StandEdit';
import { ModalContext } from './components/SimpleModal';
import { getStands, saveStand, deleteStand } from '../../utils/dbRequests';
import Images from './components/ImageUploader';
import { Link } from '@reach/router';
import DeleteModal from './components/DeleteModal';
import FileUploader from './components/FileUploader';
import EditTrivia from './EditTrivia';
import EditWorkshops from './EditWorkshops';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,

    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    maxWidth: 200,
  },
}));

export default function Stands({ db, storage }) {
  const classes = useStyles();
  const handleModal = useContext(ModalContext);
  const [stands, setStands] = useState([]);

  const init = async () => {
    refresh();
  };

  useEffect(() => {
    init();
  }, []);

  const openDownloads = (stand) => {
    handleModal(
      <FileUploader
        path={`${stand.name.toLowerCase().replace(' ', '_')}_${
          stand.id
        }/downloads`}
        files={stand.downloads}
        onChange={(files) => onDownloadsChange({ ...stand, downloads: files })}
        title="Stand Downloads"
        storage={storage}
      />
    );
  };

  const openTrivia = (stand) => {
    handleModal(
      <EditTrivia
        questions={stand.trivia}
        onSave={(trivia) => onSave({ ...stand, trivia })}
        onCancel={() => handleModal()}
      />
    );
  };

  const openWorkshops = (stand) => {
    handleModal(
      <EditWorkshops
        workshops={stand.workshops}
        onSave={(workshops) => onSave({ ...stand, workshops })}
        onCancel={() => handleModal()}
      />
    );
  };

  const openLogo = (stand) => {
    handleModal(
      <Images
        path={`${stand.name.toLowerCase().replace(' ', '_')}_${stand.id}/logo`}
        isMultiple={false}
        images={[stand.logo]}
        onChange={(image) => onGalleryChange({ ...stand, logo: image })}
        title="Profile Photo"
        storage={storage}
      />
    );
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
      renderCell: (params) => (
        <>
          <Button variant="text" size="small">
            {params.value}
          </Button>
        </>
      ),
    },
    {
      field: 'logo',
      headerName: 'Logo',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <strong>
          <IconButton
            onClick={() => openLogo(params.row)}
            variant="contained"
            color="primary"
            size="small"
          >
            {params.value !== '' ? (
              <img
                width="40"
                style={{ objectFit: 'cover' }}
                src={params.value}
                alt="logo"
              />
            ) : (
              <p>Change</p>
            )}
          </IconButton>
        </strong>
      ),
    },
    {
      field: 'downloads',
      headerName: 'Downloads',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Button
          onClick={() => openDownloads(params.row)}
          variant="outline"
          size="small"
        >
          {params.value.length} Files
        </Button>
      ),
    },

    {
      field: 'trivia',
      headerName: 'Trivia',
      width: 160,
      renderCell: (params) => (
        <Button
          onClick={() => openTrivia(params.row)}
          variant="text"
          size="small"
        >
          {params.value.length} Questions
        </Button>
      ),
    },
    {
      field: 'workshops',
      headerName: 'Workshops',
      width: 169,
      renderCell: (params) => (
        <Button
          onClick={() => openWorkshops(params.row)}
          variant="text"
          size="small"
        >
          {params.value.length} Workshops
        </Button>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton
          variant="contained"
          color="primary"
          size="small"
          onClick={() => openAdd(stands[params.value])}
          style={{ marginLeft: 16 }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'id',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            handleModal(
              <DeleteModal
                onCancel={handleModal}
                onSave={() => {
                  onDelete(params.value);
                  handleModal();
                }}
              />
            )
          }
          style={{ marginLeft: 16 }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const refresh = async () => {
    let processed = await getStands(db);
    processed = processed.map((stand, index) => {
      return { ...stand, edit: index };
    });
    setStands(processed);
  };

  const onSave = async (info) => {
    await saveStand(db, info);
    handleModal();
    refresh();
  };

  const onGalleryChange = async (info) => {
    await saveStand(db, info);
    refresh();
  };

  const onDownloadsChange = async (info) => {
    await saveStand(db, info);
    refresh();
  };

  const onDelete = async (id) => {
    await deleteStand(db, id);
    refresh();
  };

  const openAdd = (stand) => {
    handleModal(
      <StandEdit stand={stand} onSave={onSave} onCancel={() => handleModal()} />
    );
  };

  return (
    <div>
      <Typography variant="h3">Stands</Typography>

      <div className={classes.root}>
        <Button
          onClick={() => openAdd()}
          className={classes.button}
          startIcon={<PersonAddIcon />}
          variant="outlined"
        >
          Add Stand
        </Button>
        <DataTable rows={stands} columns={columns} />
      </div>
    </div>
  );
}
