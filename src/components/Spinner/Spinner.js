import React from 'react';
import { ColorRing } from 'react-loader-spinner';
// import { ColorRing } from 'react-color-ring';


function Spinner () {
    return (<ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{zIndex: 9999, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />)
  }

export default Spinner;