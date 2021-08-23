import React, { useContext, useState } from 'react';
import './Start.scss';
import logo from '../../images/logo.png';
import { navigate } from '@reach/router';
import { UserContext } from '../../App';

const stages = [
  {
    className: 'stage1',
    text1: '¡HOLA!\n NOS HEMOS MUDADO AL ESPACIO',
    text2: '¡CLICK PARA DESPEGAR EL PAULET Y ENCONTRAR LA NAVE NORDIZA DEL DIA',
    buttonText: 'INICIAR VIAJE',
  },
  {
    className: 'stage2',
    text1:
      '¡ATENCIÓN! HEMOS HALLADO LA NAVE NODRIZA DEL DIA, HAZ CLICK PARA EMPEZAR EL ACOPLAMIENTO',
    buttonText: 'INICIAR ACOPLAMIENTO',
  },
  {
    className: 'stage3',
    text1:
      'YA CASI HEMOS TERMINADO, DALE CLICK PARA FINALIZAR  EL ACOPLAMIENTO E INGRESAR A LA NAVE',
    buttonText: 'FINALIZAR ACOPLAMIENTO',
  },
  {
    className: 'stage4',
    text1:
      '¡POR LOS ANILLOS DE SATURNO, YA HEMOS LLEGADO!, DALE CLICK PARA INGRESAR',
    buttonText: 'INGRESAR A NAVE NODRIZA',
  },
];

export default function Start({ fx }) {
  const [stage, setStage] = useState(0);
  const { setUserDetails } = useContext(UserContext);

  const next = () => {
    fx('button');
    if (stage < 3) {
      setStage((s) => s + 1);
    } else {
      setUserDetails((s) => ({ ...s, start: true }));
      navigate('/');
      fx('ambience');
    }
  };

  return (
    <div className={`start-container ${stages[stage].className}`}>
      <div className="start-info-wrapper">
        <div className="start-info">
          <h4>{stages[stage].text1}</h4>
          <button className="start-button" onClick={next}>
            {stages[stage].buttonText}
          </button>
          <h4>{stages[stage].text2}</h4>
        </div>
      </div>

      <img className="general-image" alt={stage} />
      <img className="cuy-astronaut" alt="Chewcuy" />

      <img
        className={'logo'}
        src={logo}
        alt="Dia Internacional del astronomia"
      />
    </div>
  );
}
