import React, { useContext } from 'react';
import { ModalContext } from '../Admin/components/FrontModal';
import TicketModal from './TicketModal';
import ticketIcon from '../../images/ticket.svg';
import liveIcon from '../../images/live.svg';
import { UserContext } from '../../App';
import './BottomNav.scss';
import { Link } from '@reach/router';
import spaceshipIcon from '../../images/spaceship-button.svg';
import cuyIcon from '../../images/cuybutton.svg';
import download from '../../images/downloadBlack.svg';

export default function BottomNav({ data, subMenu = true, children, fx }) {
  const { userDetails } = useContext(UserContext);
  const handleModal = useContext(ModalContext);
  return (
    <div className="mobile-bottom-nav">
      <div className="mobile-bottom-wrapper">
        <div className="coins-container">
          <p>{userDetails.coins}</p>
        </div>
        {data.liveLink && (
          <a
            onClick={() => fx('button')}
            href={data.liveLink}
            rel="noreferrer"
            target="_blank"
            className="icon-button"
          >
            <img src={liveIcon} alt="live stream" />
          </a>
        )}

        <button
          onClick={() =>
            handleModal(
              <TicketModal link={data.ticketLink} coins={userDetails.coins} />
            )
          }
          className="icon-button"
        >
          <img src={ticketIcon} alt="Viaja" />
        </button>
        {subMenu && (
          <Link className="icon-button" to="/">
            <img src={spaceshipIcon} alt="Mapa" />
          </Link>
        )}
        {!subMenu && (
          <a
            className="icon-button"
            rel="noreferrer"
            href={data.brochureLink}
            target="_blank"
          >
            <img style={{ height: '60%' }} src={download} alt="Mapa" />
          </a>
        )}
        {!subMenu && (
          <Link className="icon-button" to="/interior">
            <img src={cuyIcon} alt="Mapa" />
          </Link>
        )}
      </div>

      {children}
    </div>
  );
}
