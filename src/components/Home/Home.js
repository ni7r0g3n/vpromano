import CircleType  from "../CircleType/CircleType";
import React, { useCallback, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import "./Home.css";
import Loader from "../Loader/Loader";

function Home({onClick, onImageLoad, markers, loading, imageRef}) {
    

    const Image = useCallback(() => {
        console.log("image rendered")
        return (
            <>
            {loading || <h2 id="siteTitle" className="fadeInDown title" style={{position:"absolute", top: 0, left: 0, backdropFilter: "blur(10px)", padding: "1rem",color:"white", fontFamily: "'Rubik', sans-serif"}}>{"V. P. Romano 23-30"}</h2>}
            <img ref={imageRef} onLoad={onImageLoad} className={`${loading ? null : "fadeIn"} main-image`} style={{maxHeight: "100vh", maxWidth: "100vw", zIndex:98, visibility: loading ? "hidden" : "visible"}} src={"/vpromano/Image65.jpg"}/>
            </>
        )
    }, [loading])

    return (
        <div style={{height: "100vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
            <Image/>
            {markers}
            {loading ? <Loader/> : null}
        </div>
        
    )
}

export default Home;