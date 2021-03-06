import React from "react";
import { Redirect, withRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({ component: Component, loggedIn, exact, path }) => {
    return(
        <Route
            path={path}
            exact={exact}
            render={props => 
                loggedIn ? <Redirect to="/" /> : <Component {...props} />
            } />
    );
};

const Protected = ({ component: Component, loggedIn, exact, path }) => {
    return (
        <Route
        path={path}
        exact={exact}
        render={props => 
            !loggedIn ? <Redirect to="/login" /> : <Component {...props} />
        } />
    );
}

const mapStateToProps = state => {
    return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
