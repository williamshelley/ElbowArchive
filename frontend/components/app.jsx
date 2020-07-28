import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./navigation/nav_bar_container";
import HomeContainer from "./home/home_container";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import ErrorsContainer from "./error/errors_container";
import Login from "./session/login";
import LoginContainer from "./session/login_container";
const App = () => {
    return (
        <div className="app">
            <ErrorsContainer />
            <ProtectedRoute path="/" component={HomeContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            {/* <AuthRoute exact path="/login" component={LoginFormContainer} /> */}
            {/* <AuthRoute exact path="/login" component={Login} /> */}
            <AuthRoute exact path="/login" component={LoginContainer} />
        </div>
    );
};

export default App;