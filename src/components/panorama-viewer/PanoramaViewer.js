import React from "react";

function PanoramaViewer() {
    // console.log({props});
// Get image from query params
    const urlParams = new URLSearchParams(window.location.search).get('image');
    console.log({urlParams});
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
        fontSize: "2rem", 
        textShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}} href="/#">{"< Back"}</a>
        
        <a-scene>
            <a-sky src={"/" + urlParams}></a-sky>
        </a-scene>
    </div>
  );
}

export default PanoramaViewer;

// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
// box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;