import React from 'react';
import './StandMenu.scss';
import book from '../../images/book.svg';
import play from '../../images/play.svg';
import download from '../../images/download.svg';
import qmark from '../../images/qmark.svg';
import share from '../../images/share.svg';

export default function StandMenu({}) {
  return (
    <div className="stand-menu-container">
      <button className="menu-button">
        <img src={book} alt="informacion" /> INFORMACIÓN
      </button>
      <button className="menu-button">
        <img src={play} alt="TALLERES" /> TALLERES
      </button>
      <button className="menu-button">
        <img src={qmark} alt="TRIVIA" /> TRIVIA
      </button>
      <button className="menu-button">
        <img src={download} alt="descargas" /> DESCARGAS
      </button>
      <button className="menu-button">
        <img src={share} alt="REDES" /> REDES
      </button>
    </div>
  );
}
