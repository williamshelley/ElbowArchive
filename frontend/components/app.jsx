import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./navigation/nav_bar_container";
import HomeContainer from "./home/home_container";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import ErrorsContainer from "./error/errors_container";
// import LoggedOutContainer from "./session/logged_out";
import LoggedOutContainer from "./session/logged_out_container";
import NotFound404 from "./navigation/not_found_404";
const App = () => {
    return (
        <div className="app">
            <ErrorsContainer />
            <Switch>
                <AuthRoute exact path="/login" component={LoggedOutContainer} />
                <ProtectedRoute exact path="/" component={HomeContainer} />
                <Route path="/" component={NotFound404}/>
            </Switch>
        </div>
    );
};

export default App;