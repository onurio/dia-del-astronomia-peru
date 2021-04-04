import React, { useContext, useState } from 'react';
import './DesktopMenu.scss';
import book from '../../images/book.svg';
import play from '../../images/play.svg';
import download from '../../images/download.svg';
import qmark from '../../images/qmark.svg';
import share from '../../images/share.svg';
import Information from './Information';
import Social from './Social';
import Downloads from './Downloads';
import Trivia from './Trivia';
import Workshops from './Workshops';
import { ModalContext } from '../Admin/components/FrontModal';

export default function DesktopMenu({ stand }) {
  const handleModal = useContext(ModalContext);

  console.log(stand);
  const onPress = (e) => {
    switch (e.target.id) {
      case 'info':
        handleModal(<Information stand={stand} />);
        return;
      case 'social':
        handleModal(<Social stand={stand} />);
        return;
      case 'downloads':
        handleModal(<Downloads stand={stand} />);
        return;
      case 'trivia':
        handleModal(<Trivia stand={stand} />);
        return;
      case 'workshops':
        handleModal(<Workshops stand={stand} />);
        return;
      default:
        return;
    }
  };

  return (
    <div className="stand-menu-container desktop">
      <div className="stand-menu-side">
        <button id="info" onClick={onPress} className="menu-button">
          <img src={book} alt="informacion" /> INFORMACIÓN
        </button>
        <button id="workshops" onClick={onPress} className="menu-button">
          <img src={play} alt="TALLERES" /> TALLERES
        </button>
        <button onClick={onPress} id="trivia" className="menu-button">
          <img src={qmark} alt="TRIVIA" /> TRIVIA
        </button>
      </div>

      <div className="stand-menu-side">
        <button id="downloads" onClick={onPress} className="menu-button">
          <img src={download} alt="descargas" /> DESCARGAS
        </button>
        <button id="social" onClick={onPress} className="menu-button">
          <img src={share} alt="REDES" /> REDES
        </button>
      </div>
    </div>
  );
  //   }
}
