import CircleType  from "../CircleType/CircleType";
import React, { useEffect } from "react";

function Home({onClick, onImageLoad, markers}) {
    useEffect(() => {
        new CircleType(document.getElementById('siteTitle')).radius(384);
    }, []);

    return (
        <div style={{height: "100vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
            <h2 id="siteTitle" style={{position:"absolute", top: 0, color:"white", fontFamily: "'Playfair Display', serif"}} onClick={() => {
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            }}>{"The [Insert name] Residence"}</h2>
            {markers}
            <img onLoad={onImageLoad} style={{maxHeight: "100vh", maxWidth: "100vw"}} src={"/residence-ar/Image65.png"} onClick={onClick}/>
        </div>
    )
}

export default Home;