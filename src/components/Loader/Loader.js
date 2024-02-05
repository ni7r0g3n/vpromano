import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import "./Loader.css";
// import { ColorRing } from 'react-color-ring';


function Loader () {
    return (
    <div style={{zIndex: 9998, position: 'absolute', top: '0%', left: '0%', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    }} className='backdrop-gradient'>
    <span className='spinner'></span>
    <div className='loader'></div>
    {/* <span style={{
      fontFamily: "'Source Code Pro', monospace",
      color: "white", 
    }}>Loading, please wait...</span> */}
    </div>)
  }

export default Loader;