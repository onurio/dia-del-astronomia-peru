import React, { useState } from 'react';
import './StandMenu.scss';
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

export default function StandMenu({ stand, handleModal, fx = () => {} }) {
  const [route, setRoute] = useState();
  const onPress = (e) => {
    setRoute(e.target.id);
  };
  switch (route) {
    case 'info':
      handleModal('keep', { onBack: () => setRoute() });
      return <Information stand={stand} />;
    case 'social':
      handleModal('keep', { onBack: () => setRoute() });
      return <Social fx={fx} stand={stand} />;
    case 'downloads':
      handleModal('keep', { onBack: () => setRoute() });
      return <Downloads fx={fx} stand={stand} />;
    case 'trivia':
      handleModal('keep', { onBack: () => setRoute() });
      return <Trivia fx={fx} stand={stand} />;
    case 'workshops':
      handleModal('keep', { onBack: () => setRoute() });
      return <Workshops fx={fx} stand={stand} />;
    default:
      handleModal('keep', {});
      return (
        <div className="stand-menu-container">
          <button id="info" onClick={onPress} className="menu-button">
            <img src={book} alt="informacion" /> INFORMACIÓN
          </button>
          <button id="workshops" onClick={onPress} className="menu-button">
            <img src={play} alt="TALLERES" /> TALLERES
          </button>
          <button onClick={onPress} id="trivia" className="menu-button">
            <img src={qmark} alt="TRIVIA" /> TRIVIA
          </button>
          <button id="downloads" onClick={onPress} className="menu-button">
            <img src={download} alt="descargas" /> DESCARGAS
          </button>
          <button id="social" onClick={onPress} className="menu-button">
            <img src={share} alt="REDES" /> REDES
          </button>
        </div>
      );
  }
}
