import React, { useContext, useEffect, useState } from 'react';
import './Stand.scss';
import logo from '../../images/logo.png';
import Hamburger from './components/Hamburger';
import StandMenu from './StandMenu';
import { ModalContext } from '../Admin/components/FrontModal';
import DesktopMenu from './DesktopMenu';
import BottomNav from './BottomNav';
import Mars from './Mars';
import Loader from './Loader';
import { UserContext } from '../../App';

const planets = [
  {
    name: 'Marte',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2372_Mars_1_6792.glb',
  },
  {
    name: 'Urano',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2344_Uranus_1_51118.glb',
  },
  {
    name: 'Venus',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2342_Venus%28surface%29_1_12103.glb',
  },
  {
    name: 'Plutón',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2357_Pluto_1_2374.glb',
  },
  {
    name: 'Saturno',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2355_Saturn_1_120536.glb',
  },
  {
    name: 'Sol',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2352_Sun_1_1391000.glb',
  },
  {
    name: 'Neptuno',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2364_Neptune_1_49528.glb',
  },
  {
    name: 'Júpiter',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2375_Jupiter_1_142984.glb',
  },
  {
    name: 'Mercurio',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2369_Mercury_1_4878.glb',
  },
  {
    name: 'Tierra',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2392_EarthClouds_1_12756.glb',
  },
  {
    name: 'Luna',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2366_Moon_1_3474.glb',
  },
  {
    name: 'Io',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2379_Io_1_3643.glb',
  },
  {
    name: 'Europa',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2388_Europa_1_3138.glb',
  },
  {
    name: 'Ganímedes',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2385_Ganymede_1_5268.glb',
  },
  {
    name: 'Jápeto',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2381_Iapetus_1_1471.glb',
  },
  {
    name: 'Calisto',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2402_Callisto_1_4821.glb',
  },
  {
    name: 'Encélado',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2391_Enceladus_1_504.glb',
  },
  {
    name: 'Ceres',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2400_Ceres_1_1000.glb',
  },
  {
    name: 'Tritón',
    link:
      'https://solarsystem.nasa.gov/system/resources/gltf_files/2346_Triton_1_2707.glb',
  },
];

export default function Stand({ stands = [], id, data, fx }) {
  const handleModal = useContext(ModalContext);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [actived, setActived] = useState('');
  const [stand, setStand] = useState();

  useEffect(() => {
    setStand(stands.filter((std) => std.id === id)[0]);
  }, [id, stands]);

  useEffect(() => {
    if (userDetails.visited) {
      if (!userDetails.visited[id]) {
        setUserDetails((s) => ({
          ...s,
          coins: s.coins + 2,
          visited: { ...s.visited, [id]: true },
        }));
      }
    } else {
      setUserDetails((s) => ({
        ...s,
        coins: s.coins + 2,
        visited: { [id]: true },
      }));
    }
    setTimeout(() => {
      fx('good');
      setActived('activated');
    }, 1000);
  }, []);

  const openMenu = () => {
    handleModal(<StandMenu fx={fx} handleModal={handleModal} stand={stand} />);
  };

  if (!stand) return <Loader progress={100} />;
  return (
    <div className="stand-container">
      <div className="logo-container">
        <img
          className="logo"
          src={logo}
          alt="dia internacional de astronomia peru"
        />
      </div>
      <BottomNav fx={fx} data={data}>
        <Hamburger onClick={openMenu} />
      </BottomNav>
      <Mars planet={planets[stand.edit]} />
      <div className="desk-wrapper">
        <div className={'desk ' + actived}>
          <img src={stand.logo} alt="" />
        </div>
        <img alt="projector" className="projector" />
      </div>

      <DesktopMenu fx={fx} stand={stand} />
    </div>
  );
}
