import React from "react";
import ProfileHeader from "./profile_header";
import AboutContainer from "./about_container";
import TimelineContainer from "./timeline_container";
import { ProtectedRoute } from "../../util/route_util";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound404 from "../navigation/not_found_404";


const Profile = ({ user }) => {
    return (
        <div className="profile">

            <ProfileHeader user={user} />

            <div className="body">
                <div className="content">
                    <Switch>

                        <ProtectedRoute exact path="/profile"
                            component={TimelineContainer} />

                        <ProtectedRoute path="/profile/about"
                            component={AboutContainer} />

                        <Redirect to="/page-not-found" />

                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Profile;