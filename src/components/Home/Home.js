import CircleType  from "../CircleType/CircleType";
import React, { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import "./Home.css";
import Loader from "../Loader/Loader";

function Home({onClick, onImageLoad, markers, loading, imageRef}) {

    return (
        <div style={{height: "100vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
            {loading ? null : <h2 id="siteTitle" className="fadeInDown title" style={{position:"absolute", top: 0,  color:"white", fontFamily: "'Poppins', sans-serif"}} onClick={() => {
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }}>{"V. P. Romano 23-30"}</h2>}
            <img ref={imageRef} onLoad={onImageLoad} className={loading ? null : "fadeIn"} style={{maxHeight: "100vh", maxWidth: "100vw", zIndex:98, visibility: loading ? "hidden" : "visible"}} src={"/residence-ar/Image65.png"} onClick={onClick}/>
            {markers}
            {loading ? <Loader/> : null}
        </div>
        
    )
}

export default Home;