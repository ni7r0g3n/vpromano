import React from "react";
import "./StyledButton.css";

function StyledButton({onClick, children, style}) {
    return (
        
            <button onClick={onClick} className="btn" style={style}>
                {/* <div> */}
                    {children}
                {/* </div> */}
                
            </button>
    )
}

export default StyledButton;