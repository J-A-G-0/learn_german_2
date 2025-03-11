import {useLocation} from 'react-router-dom';
import Modal from '../Components/Modal';
import { useState } from 'react';
import TileGrid from '../TileGrid';



function Home() {
    
    return (
        <div className='grid-container'>
          <TileGrid />
        </div>
      );    
}

export default Home;
