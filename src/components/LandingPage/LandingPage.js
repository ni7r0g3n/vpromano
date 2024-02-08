import React from "react";
import "./LandingPage.css";
import Logo from "../Logo/Logo";
import StyledButton from "../StyledButton/StyledButton";
import { FaFilePdf } from "react-icons/fa";

function LandingPage({onClick}) {
    return (
        <div className="landing-page">
            <div className="frosting">
                <Logo/> 
                <h1 className="landing-title">V. P. ROMANO 23-30</h1>
                
                <StyledButton onClick={onClick}>Enter</StyledButton>
                <br/>
                <StyledButton style={{marginTop: "1rem", fontSize: 16, textAlign: "center"}} onClick={() => window.open("/vpromano/09_Romano_Baiardi-Ballabio-Deri.pdf", "_blank")}>Scarica il Book 
                {/* <FaFilePdf style={{verticalAlign: "middle"}}></FaFilePdf> */}
                </StyledButton>
            </div>
        </div>
    )
}

export default LandingPage;