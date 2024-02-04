import CircleType  from "../CircleType/CircleType";
import React, { useEffect } from "react";
import Spinner from "../Spinner/Spinner";

function Home({onClick, onImageLoad, markers, loading}) {

    return (
        <div style={{height: "100vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
            <h2 id="siteTitle" style={{position:"absolute", top: 0, left: "1rem", color:"white", fontFamily: "'source code pro', monospace"}} onClick={() => {
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }}>{"23-20 VP Romano"}</h2>
            {markers}
            <img onLoad={onImageLoad} style={{maxHeight: "100vh", maxWidth: "100vw"}} src={"/Image65.png"} onClick={onClick}/>
            {loading && <Spinner/>}
        </div>
    )
}

export default Home;