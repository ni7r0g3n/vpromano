import React from 'react';
import { ColorRing } from 'react-loader-spinner';
// import "./Spinner.css";
// import { ColorRing } from 'react-color-ring';


function Spinner () {
    return (
    <div style={{zIndex: 9998, position: 'absolute', top: '0%', left: '0%', height: '100%', width: '100%',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    }} className='backdrop-gradient'>
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      // wrapperStyle={{zIndex: 9999, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    <span style={{
      fontFamily: "'Source Code Pro', monospace",
      color: "white", 
    }}>Loading, please wait...</span>
    </div>)
  }

export default Spinner;