import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FaCamera, FaChevronLeft } from "react-icons/fa";
import "./PanoramaViewer.css";

function PanoramaViewer({close, currentImage}) {
    // console.log({props});
// Get image from query params
  const [loading, setLoading] = useState(true);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // set listener for back button or device back action
    const scene = document.querySelector("a-scene")

    function handleResize(){
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
      console.log({screenHeight, screenWidth})
    }

    scene.addEventListener("loaded", () => {
      console.log("scene loaded");
      setLoading(false);
    })

    window.addEventListener("resize", handleResize);

    return () => {
      scene.removeEventListener("loaded", () => {
        setLoading(false);
      })
      window.removeEventListener("resize", handleResize);
    }
  },[]);


  function screenshot(){
    document.querySelector("a-scene").components.screenshot.capture("perspective", "screenshot.png");
  }

  return (
    <div>
        {/* Back button */}
        <a style={{position: "absolute", 
        fontFamily: "'Source Code Pro', monospace", 
        left: "1rem", 
        top: "0.5rem",
        zIndex: 9999, 
        textDecoration: "none", 
        color: "white", 
        fontWeight: "bold",
        fontSize: "1.5rem",
        lineHeight: "1.5rem",
        cursor: "pointer",
        textShadow: "0px 0px 3px rgba(0,0,0,1)"}} onClick={close}>
          <FaChevronLeft className="shadow" size={16}></FaChevronLeft> BACK
        </a>
        <a onClick={screenshot} style={{position: "absolute", top: "0.5rem", right: "1rem", zIndex: 9999, textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "1.5rem", lineHeight: "1.5rem", cursor: "pointer", textShadow: "0px 0px 3px rgba(0,0,0,1)"}}>
          <FaCamera className="shadow"/>
        </a>
        
        <a-scene screenshot={`width:${screenWidth*2};height:${screenHeight*2};`}>
            <a-sky src={"/vpromano/" + currentImage}></a-sky>
        </a-scene>
        {loading ? <Loader></Loader> : null}
    </div>
  );
}

export default PanoramaViewer;

// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
// box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;