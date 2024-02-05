import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { FaChevronLeft } from "react-icons/fa";
import "./PanoramaViewer.css";

function PanoramaViewer({close, currentImage}) {
    // console.log({props});
// Get image from query params
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // set listener for back button or device back action
    window.addEventListener("popstate", (event) => {
      event.preventDefault();
      event.stopPropagation();

      close()
    });
    const scene = document.querySelector("a-scene")

    scene.addEventListener("loaded", () => {
      console.log("scene loaded");
      setLoading(false);
    })

    return () => {
      window.removeEventListener("popstate", close);
      scene.removeEventListener("loaded", () => {
        setLoading(false);
      })
    }
  },[]);

  return (
    <div>
        {/* Back button */}
        <a style={{position: "absolute", 
        fontFamily: "'Source Code Pro', monospace", 
        left: "1rem", 
        zIndex: 9999, 
        textDecoration: "none", 
        color: "white", 
        fontWeight: "bold",
        fontSize: "1.5rem",
        lineHeight: "1.5rem", 
        textShadow: "0px 0px 3px rgba(0,0,0,1)"}} onClick={close}>
          <FaChevronLeft className="shadow" size={16}></FaChevronLeft> BACK
        </a>
        
        <a-scene loading-screen="enabled:true;">
            <a-sky src={"/residence-ar/" + currentImage}></a-sky>
        </a-scene>
        {loading ? <Loader></Loader> : null}
    </div>
  );
}

export default PanoramaViewer;

// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
// box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;