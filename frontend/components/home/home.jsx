import React from "react";
import { Link } from "react-router-dom";

const Home = ({ currentUser, logout }) => {
    return (
        <div className="home">
            {
                currentUser ? (
                    <button onClick={logout}>Log Out</button>
                ) : (
                    <>
                        <Link
                            className="signup-button"
                            to="/signup">Create New Account</Link>

                        <Link
                            className="login-button"
                            to="/login">Log In</Link>
                    </>
                )
            }
        </div>
    );
};

export default Home;