import React from "react";

const NavBar = ({ logout }) => {
    return (
        <button onClick={logout}>Log Out</button>
    );
};

export default NavBar;