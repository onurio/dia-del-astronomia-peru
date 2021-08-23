import React from 'react';
import './Mars.scss';

export default function Mars({ planet }) {
  return (
    <div style={{ position: 'relative' }}>
      <model-viewer
        loading="eager"
        style={{
          zIndex: 20,
          position: 'absolute',
          top: '10vh',
          left: '50%',
          zIndex: 1000,
          transform: 'translateX(-50%)',
        }}
        src={planet.link}
        alt="A 3D model of an astronaut"
        auto-rotate
        camera-controls
      ></model-viewer>

      <div className="planet-name">
        <h5> ASTRODESTINO:</h5>
        <h3>{planet.name}</h3>
      </div>
    </div>
  );
}
