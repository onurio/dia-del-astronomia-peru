import React, { useContext, useState } from 'react';
import Hamburger from './components/Hamburger';
import './Home.scss';
import TicketModal from './TicketModal';
import ticketIcon from '../../images/ticket.svg';
import liveIcon from '../../images/live.svg';
import { ModalContext } from '../Admin/components/FrontModal';
import StandMenu from './StandMenu';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import { navigate } from '@reach/router';
import BottomNav from './BottomNav';
import SimpleLoader from './SimpleLoader';

let standPositions = [
  {
    left: '17.9%',
    top: '45.2%',
  },
  {
    left: '15.7%',
    top: '50%',
  },
  {
    left: '15.7%',
    top: '41%',
  },
  {
    left: '33.4%',
    top: '33.2%',
  },
  {
    left: '36.9%',
    top: '33.2%',
  },
  {
    left: '40.5%',
    top: '33.2%',
  },
  {
    left: '44%',
    top: '33.2%',
  },
  {
    left: '47.8%',
    top: '33.2%',
  },
  {
    left: '51%',
    top: '35.2%',
  },
  {
    left: '33.4%',
    top: '57.5%',
  },
  {
    left: '36.9%',
    top: '57.5%',
  },
  {
    left: '40.5%',
    top: '57.5%',
  },
  {
    left: '44%',
    top: '57.5%',
  },
  {
    left: '47.8%',
    top: '57.5%',
  },
  {
    left: '51%',
    top: '55.5%',
  },
  {
    left: '62.5%',
    top: '38%',
  },
  {
    left: '62.5%',
    top: '52.5%',
  },
  {
    left: '69%',
    top: '40%',
  },
  {
    left: '69%',
    top: '45.5%',
  },
  {
    left: '69%',
    top: '51%',
  },
];

const StandPreview = ({ stand, onNav, fx }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="content-container">
      <h2>{stand.name}</h2>
      <img
        onLoad={() => setLoaded(true)}
        style={{ maxHeight: 250, margin: '0 auto', objectFit: 'contain' }}
        src={stand.logo}
        width="100%"
        alt=""
      />

      {!loaded && (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <SimpleLoader />
        </div>
      )}
      <button
        onClick={() => {
          fx('button');
          navigate('/cabina/' + stand.id);
          onNav();
        }}
        style={{ marginTop: 50 }}
      >
        Entrar
      </button>
    </div>
  );
};

export default function Home({ data, fx }) {
  const handleModal = useContext(ModalContext);
  const { userDetails } = useContext(UserContext);

  const openStand = (index) => {
    if (data.stands) {
      if (index < data.stands.length) {
        fx('interface');

        handleModal(
          <StandPreview
            fx={fx}
            onNav={() => {
              handleModal();
            }}
            stand={data.stands[index]}
          />
        );
      }
    }
  };

  return (
    <div className="home">
      <div className="bg">
        <div className="spaceship">
          {standPositions.map((pos, index) => {
            return (
              <button
                key={pos.left + pos.top + index}
                style={pos}
                className="stand-button"
                onClick={() => openStand(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav fx={fx} subMenu={false} data={data} />
      <div className="logo-container">
        <img
          className="logo"
          src={logo}
          alt="dia internacional de astronomia peru"
        />
      </div>
    </div>
  );
}
