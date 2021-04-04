import React from 'react';
import astronaut from '../../images/astronaut.svg';
import astronautsad from '../../images/astronaut-sad.svg';

import './TicketModal.scss';

export default function TicketModal({ coins, link }) {
  if (coins >= 100) {
    return (
      <div className="content-container ticket-modal ">
        <p>¡ FELICITACIONES ! </p>
        <img width="100px" src={astronaut} alt="Astronauta" />

        <p>
          Has acumulado {coins} monedas y has ganado un viaje a un planeta
          desconocido en otra galaxia.
        </p>
        <a href={link} target="_blank" rel="noreferrer">
          BON VOYAGE!
        </a>
      </div>
    );
  } else {
    return (
      <div className="content-container ticket-modal ">
        <p>
          Aún no has acumulado la suficiente cantidad de monedas para viajar a
          otra galaxia. 
        </p>
        <img width="100px" src={astronautsad} alt="Astronauta" />

        <p>Puedes ganar monedas de la siguiente manera:</p>
        <p>1. Visitando nuestras cabinas</p>
        <p>
          2. Respondiendo las trivias ( ¡las respuestas las encontrarás viendo
          los talleres!)
        </p>
      </div>
    );
  }
}
