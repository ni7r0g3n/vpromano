import React from "react";
import "./LandingPage.css";
import Logo from "../Logo/Logo";
import StyledButton from "../StyledButton/StyledButton";

function LandingPage({onClick}) {
    return (
        <div className="landing-page">
            <div className="frosting">
                <Logo/> 
                <h1 className="landing-title">V. P. ROMANO 23/30</h1>
                
                <StyledButton onClick={onClick}>Enter</StyledButton>
            </div>
        </div>
    )
}

export default LandingPage;