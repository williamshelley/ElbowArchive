import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../../util/route_util";
import ProfileContainer from "../user/profile_container";
import LoggedOutContainer from "./logged_out_container";
import NotFound404 from "../navigation/not_found_404";

const MainContent = () => (
    <Switch>
        <AuthRoute exact path="/login" component={LoggedOutContainer} />
        <ProtectedRoute path="/profile" component={ProfileContainer} />
        <Route path="/" component={NotFound404}/>
    </Switch>
);

export default MainContent;