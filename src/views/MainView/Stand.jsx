import React, { useContext, useEffect, useState } from 'react';
import './Stand.scss';
import logo from '../../images/logo.png';
import Hamburger from './components/Hamburger';
import ticketIcon from '../../images/ticket.svg';
import liveIcon from '../../images/live.svg';
import StandMenu from './StandMenu';
import { ModalContext } from '../Admin/components/FrontModal';
import { UserContext } from '../../App';
import DesktopMenu from './DesktopMenu';
import TicketModal from './TicketModal';

export default function Stand({ stands = [], id, liveLink, ticketLink }) {
  const handleModal = useContext(ModalContext);
  const [stand, setStand] = useState();
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    setStand(stands.filter((std) => std.id === id)[0]);
  }, [id, stands]);

  const openMenu = () => {
    handleModal(<StandMenu handleModal={handleModal} stand={stand} />);
  };

  if (!stand) return <div>loading</div>;
  return (
    <div className="stand-container">
      <div className="logo-container">
        <img
          className="logo"
          src={logo}
          alt="dia internacional de astronomia peru"
        />
      </div>
      <div className="mobile-bottom-nav">
        <div className="coins-container">
          <p>{userDetails.coins}</p>
        </div>
        <a
          href={liveLink}
          rel="noreferrer"
          target="_blank"
          className="icon-button"
        >
          <img src={liveIcon} alt="live stream" />
        </a>
        <button
          onClick={() =>
            handleModal(
              <TicketModal link={ticketLink} coins={userDetails.coins} />
            )
          }
          className="icon-button"
        >
          <img src={ticketIcon} alt="Viaja" />
        </button>
        <Hamburger onClick={openMenu} />
      </div>
      <div className="desk">
        <img src={stand.logo} alt="" />
      </div>
      <DesktopMenu stand={stand} />
    </div>
  );
}
