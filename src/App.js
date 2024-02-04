import logo from './logo.svg';
import './App.css';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import PanoramaViewer from './components/panorama-viewer/PanoramaViewer';
import Home from './components/panorama-viewer/Home';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaStreetView } from "react-icons/fa";

function App() {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [imagePath, setImagePath] = useState(null);

  const [loading, setLoading] = useState(true);

  const markersList = [
    {x: 5, y: 1, image: "Panorama3.png"},
    {x: 1, y: 3, image: "Panorama2.png"},
    {x: 3, y: 1, image: "Panorama5.png"},
    {x: 3, y: 3, image: "Panorama6.png"},
    {x: 5, y: 6, image: "Panorama7.png"},
  ];

  const markers = useMemo(() => {
    if (imageSize.width === 0) return [];

    return markersList.map((marker, index) => {
      const id = `marker-${index}`;
      return (
        <div key={index} className='marker myGlower' onClick={() => goToViewer({x: marker.x, y: marker.y})} style={{
          left: (marker.x * (imageSize.width / 6)) - 35  + 'px',
          top: (marker.y * (imageSize.height / 6)) + 35   + 'px'}}
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
        return marker.image;
      }
    });
    setImagePath(marker.image);
    window.location.href = "/#/panorama-viewer?image=" + marker.image;
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
    var bounds = event.target.getBoundingClientRect();
    setImageSize({width: bounds.width, height: bounds.height});
    setLoading(false);
  }

    

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home markers={markers} onImageLoad={onImageLoad} onClick={onClick} />}/>
          <Route path='/panorama-viewer' element={
            <PanoramaViewer/>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
