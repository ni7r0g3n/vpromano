import logo from './logo.svg';
import './App.css';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import PanoramaViewer from './components/panorama-viewer/PanoramaViewer';
import Home from './components/Home/Home';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaStreetView } from "react-icons/fa";

function App() {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [offset, setOffset] = useState({x: 0, y: 0});
  const [imagePath, setImagePath] = useState(null);
  const [openViewer, setOpenViewer] = useState(false);
  const imageRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const aspectRatio = window.devicePixelRatio || 1;

  const markersList = [
    {x: 4.15, y: 0.5, image: "Panorama3.png"},
    {x: 0.3, y: 2.3, image: "Panorama2.png"},
    {x: 2.5, y: 0.8, image: "Panorama5.png"},
    {x: 2.4, y: 2.6, image: "Panorama6.png"},
    {x: 4.5, y: 5.7, image: "Panorama7.png"},
  ];

  useEffect(() => {
    const handleResize = () => {
      const bounds = imageRef.current.getBoundingClientRect();
      setImageSize({width: bounds.width, height: bounds.height});
      setOffset({x: bounds.left, y: bounds.top});
    }
    window.addEventListener("resize", handleResize );
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);


  const markers = useMemo(() => {
    if (imageSize.width === 0) return [];

    return markersList.map((marker, index) => {
      const id = `marker-${index}`;
      const screenWidth = window.innerWidth;

      const centerX = 3;  // Center of the grid
      const centerY = 3;  // Center of the grid
  
      // Calculate rotated coordinates with respect to the center
      const xDiff = marker.x - centerX;
      const yDiff = marker.y - centerY;
  
      const rotatedX = centerX + yDiff;
      const rotatedY = centerY - xDiff;
  
      var x = screenWidth > 768 ? rotatedX : marker.x;
      var y = screenWidth > 768 ? rotatedY : marker.y;

      x = x >= 0 ? x : 0;
      y = y >= 0 ? y : 0;

      const offsetConstY = screenWidth > 768 ? offset.y - 40 : offset.y; //215.88
      const offsetConstX = offset.x; //0
      // console.log(`Math.round(${x} * (${imageSize.width} / 6)) + ${offsetConstX}= ${Math.round(x * (imageSize.width / 6)) + (offsetConstX)}`);
      console.log(`Math.round(${y} * (${imageSize.height} / 6)) + ${offsetConstY}= ${Math.round(y * (imageSize.height / 6)) + (offsetConstY)}`);
      return (
        <div key={index} className='marker myGlower fadeInDelayed' onClick={() => goToViewer({x: marker.x, y: marker.y})} style={{
          // left: (Math.round(x * (imageSize.width / 6)) - 35) + 'px',
          //account for offset of the image
          left: (Math.round(x * (imageSize.width / 6)) + (offsetConstX)) + 'px', //152.66 * 2.6 + 0 = 396.716
          // top: (Math.round(y * (imageSize.height / 6)) + 25) + 'px'}}
          top: (Math.round(y * (imageSize.height / 6)) + (offsetConstY)) + 'px'}} // 215.88 + 152.66 * 2.4 = 600.52
        >
          <FaStreetView
            className="marker-icon"
            key={index}
            id={id}
            />
          </div>
      );
    });
  }, [imageSize]);

  function relativeCoords ( event ) {
    var bounds = event.target.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;

    // turn x and y into a value between 1 and 6 as if the image was a 6x6 grid
    x = Math.ceil( x / (bounds.width / 6) );
    y = Math.ceil( y / (bounds.height / 6) );

    return {x: x, y: y};
  }

  function goToViewer(coords){
    const marker = markersList.find(marker => {
      if (marker.x === coords.x && marker.y === coords.y) {
        return marker;
      }
    });
    setImagePath(marker.image);
    window.history.pushState(null, null, "");
    setOpenViewer(true);
    // window.location.href = "/#/panorama-viewer?image=" + marker.image;
  }

  function onClick ( event ) {
    var coords = relativeCoords( event );
    console.log( "x: " + coords.x + ", y: " + coords.y );
    goToViewer(coords);
  }

  //on img load get the width and height of the image to then place divs on top of it
  //to then make the divs clickable to go to the panorama viewer
  //also need to make the divs responsive to the image size
  function onImageLoad ( event ) {
    console.log("image loaded");
    var bounds = event.target.getBoundingClientRect();
    setImageSize({width: bounds.width, height: bounds.height});
    setOffset({x: bounds.left, y: bounds.top});
    setLoading(false);
  }

    

  return (
    <div className="App">
      { openViewer ?
        <PanoramaViewer currentImage={imagePath} close={() => setOpenViewer(false)}/>
        :  
        <Home markers={markers} loading={loading} imageRef={imageRef} onImageLoad={onImageLoad} onClick={onClick} />
      }    
    </div>
  );
}

export default App;
