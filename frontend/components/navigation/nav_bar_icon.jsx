import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = ({ url, onClick, id, children }) => {
    return url ? (
        <div className="icon" id={id}>
            <a href={url} target="_blank">
                {children}
            </a>
        </div>
    ) : (
        <div className="icon" onClick={onClick} id={id}>
            {children}
        </div>
    )
}

const NavBarIcon = ({ icon, onClick, hoverText, id, children, url }) => {
    return (
        <Wrapper url={url} onClick={onClick} id={id}>
            <FontAwesomeIcon icon={icon} />
            {hoverText && <span className="hover-text">{hoverText}</span>}
            {children}
        </Wrapper>
    )
}

export default NavBarIcon;