import './App.css';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import PanoramaViewer from './components/panorama-viewer/PanoramaViewer';
import Home from './components/Home/Home';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaStreetView } from "react-icons/fa";
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [offset, setOffset] = useState({x: 0, y: 0});
  const [imagePath, setImagePath] = useState(null);
  const [openViewer, setOpenViewer] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  window.historyStack = useRef([]);
  var navigatingForward = useRef(false);
  const imageRef = useRef(null);

  var loadingOrResizing = useRef(true);

  const [loading, setLoading] = useState(true);
  const aspectRatio = window.devicePixelRatio || 1;

  const markersList = [
    {x: 0.55, y: 3.4, image: "Panorama2.png"},
    {x: 2.35, y: 0.9, image: "Panorama3.png"},
    {x: 3, y: 4.7, image: "Panorama4.png"},
    {x: 1.22, y: 0.8, image: "Panorama5.png"},
    {x: 4, y: 0.4, image: "Panorama6.png"},
    {x: 2.7, y: 5.7, image: "Panorama7.png"},
    {x: 3.15, y: 2.45, image: "Panorama8.png"},
  ];

  useEffect(() => {
    if (!imageRef) return;
    console.log("adding event listener")
    const handleResize = () => {
      if (!imageRef.current) return;
      loadingOrResizing.current = false;
      const bounds = imageRef.current.getBoundingClientRect();
      setImageSize({width: bounds.width, height: bounds.height});
      setOffset({x: bounds.left, y: bounds.top});
    }

    window.addEventListener("resize", handleResize );
    window.addEventListener("popstate", closeHome)
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", closeHome);
    }
  }, []);

  function closeHome(event){
    event.preventDefault();
    event.stopPropagation();
    // console.log("Firesd", navigatingForward)
    // if (navigatingForward){
    //   navigatingForward = false;
    //   return;
    // }
    // console.log("closingHome", window.isStateChangeAPush)
    console.log({his: window.historyStack.current })
    const goBack = window.historyStack.current.pop();
    if (goBack){
      goBack();
    }
    // setOpenHome(false);
  }

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
      // console.log(`Math.round(${y} * (${imageSize.height} / 6)) + ${offsetConstY}= ${Math.round(y * (imageSize.height / 6)) + (offsetConstY)}`);
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
            style={{fontSize: "1rem"}}
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
    console.log("goingToViewer")
    const marker = markersList.find(marker => {
      if (marker.x === coords.x && marker.y === coords.y) {
        return marker;
      }
    });
    setImagePath(marker.image);
    // window.isStateChangeAPush = true;
    navigatingForward = true
    console.log({his: window.historyStack})
    window.historyStack.current.push(() => setOpenViewer(false));
    window.history.pushState({}, null, "")
    console.log({his: window.historyStack})
    setOpenViewer(true);
    // window.location.href = "/#/panorama-viewer?image=" + marker.image;
  }

  function onClick ( event ) {
    var coords = relativeCoords( event );
    // console.log( "x: " + coords.x + ", y: " + coords.y );
    goToViewer(coords);
  }

  function onEnter(){
    console.log("onEnter")
    // window.isStateChangeAPush = true
    navigatingForward = true
    window.historyStack.current.push(() => setOpenHome(false));
    window.history.pushState({}, null, "")
    console.log({his: window.historyStack})
    setOpenHome(true);
  }

  //on img load get the width and height of the image to then place divs on top of it
  //to then make the divs clickable to go to the panorama viewer
  //also need to make the divs responsive to the image size
  function onImageLoad ( event ) {
    console.log("image loaded", loadingOrResizing.current, loading);
    if (!loadingOrResizing.current){
      return;
    }
    // if (!loading) return;
    var bounds = event.target.getBoundingClientRect();
    setImageSize({width: bounds.width, height: bounds.height});
    setOffset({x: bounds.left, y: bounds.top});
    setLoading(false);
    loadingOrResizing.current = false;
  }


  function Viewer(){
    return (
    <>
        { openViewer ?
        <PanoramaViewer close={() => closeHome(new Event(""))} currentImage={imagePath} />
        :  
        <Home markers={markers} loading={loading} imageRef={imageRef} onImageLoad={onImageLoad} onClick={onClick} />
        }
    </>
      )
  }
    

  return (
    <div className="App">
      {!openHome ?
       <LandingPage onClick={onEnter}> </LandingPage>
        : 
      <Viewer/>
      }
    </div>
  );
}

export default App;
