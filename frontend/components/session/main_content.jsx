import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../../util/route_util";
import ProfileContainer from "../user/profile_container";
import LoggedOutContainer from "./logged_out_container";
import NotFound404 from "../navigation/not_found_404";
import FriendRequestIndexContainer from "../friends/friend_request_index_container";
import NewsfeedContainer from "../newsfeed/newsfeed_container";

const MainContent = ({ user, notFound }) => {
    return (
        <>
        {/* {notFound[0] === "User could not be found." ? 
            <Redirect to="/user-not-found" /> : null
        } */}
        <Switch>

            <AuthRoute exact path="/login" component={LoggedOutContainer} />

            <ProtectedRoute path="/profile/:userId"
                component={ProfileContainer} />

            <ProtectedRoute path="/friend_requests"
                component={FriendRequestIndexContainer} />

            <ProtectedRoute exact path="/" component={NewsfeedContainer} />

            <ProtectedRoute path="/" component={NotFound404} />

        </Switch>
        </>
    );
}
export default MainContent;