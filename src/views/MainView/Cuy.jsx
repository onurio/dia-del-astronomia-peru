import React, { useState } from 'react';
import './Cuy.scss';
import { ReactComponent as Arrow } from '../../images/cuy-images/arrow.svg';
import BottomNav from './BottomNav';
const rooms = [
  {
    className: 'room1',
  },
  {
    className: 'room2',
  },
  {
    className: 'room3',
  },
  {
    className: 'room4',
  },
];

export default function Cuy({ data, fx }) {
  const [room, setRoom] = useState(0);

  const onArrowPress = (type) => {
    fx('button');
    if (type) {
      setRoom((s) => (s + 1) % 4);
    } else {
      setRoom((s) => {
        if (s > 0) {
          return s - 1;
        } else {
          return 3;
        }
      });
    }
  };

  return (
    <div className={`room-wrapper ${rooms[room].className}`}>
      <Arrow onClick={() => onArrowPress(true)} className="arrow-right" />
      <Arrow onClick={() => onArrowPress(false)} className="arrow-left" />
      <div className="chucuy-wrapper">
        <img className="text" alt="Text" />

        <img width="50px" className="chucuy" alt="Chucuy" />
        <img width="50px" className="chucuy reflection" alt="Chucuy" />
      </div>
      <BottomNav data={data} />
    </div>
  );
}
