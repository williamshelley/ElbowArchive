import React from "react";
import { Link } from "react-router-dom";
import NavBarContainer from "../navigation/nav_bar_container";
import style from "../../styles/session";

const Home = ({ currentUser, logout }) => {
    return (
        <div className="home">
            <h1>ElbowArchive</h1>
            <NavBarContainer />
            <button 
                className={style.LOGIN_BUTTON}
                onClick={logout}>Log Out</button>
        </div>
    );
};

export default Home;