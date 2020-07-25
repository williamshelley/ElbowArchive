import React from "react";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import { AuthRoute } from "../util/route_util";
import { Link, Route } from "react-router-dom";
import NavBarContainer from "./navigation/nav_bar_container";

const App = () => {
    return (
        <div className="app">
            <Link 
                className="signup-button" 
                to="/signup">Create New Account</Link>
                
            <Link 
                className="login-button"
                to="/login">Log In</Link>

            <Route exact path="/" component={NavBarContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/login" component={LoginFormContainer} />
        </div>
    );
};

export default App;