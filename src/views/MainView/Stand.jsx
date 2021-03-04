import React, { useContext } from 'react';
import './Stand.scss';
import logo from '../../images/logo.png';
import Hamburger from './components/Hamburger';
import ticketIcon from '../../images/ticket.svg';
import liveIcon from '../../images/live.svg';
import StandMenu from './StandMenu';
import { ModalContext } from '../Admin/components/FrontModal';

export default function Stand({ id }) {
  const handleModal = useContext(ModalContext);

  const openMenu = () => {
    handleModal(<StandMenu />);
  };

  return (
    <div className="stand-container">
      {/* Stand{id} */}
      <div className="logo-container">
        <img
          className="logo"
          src={logo}
          alt="dia internacional de astronomia peru"
        />
      </div>
      <div className="mobile-bottom-nav">
        <div className="coins-container"></div>
        <button className="icon-button">
          <img src={liveIcon} alt="live stream" />
        </button>
        <button className="icon-button">
          <img src={ticketIcon} alt="Viaja" />
        </button>
        <Hamburger onClick={openMenu} />
      </div>
    </div>
  );
}
