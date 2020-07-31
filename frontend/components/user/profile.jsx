import React from "react";
import ProfileHeader from "./profile_header";
import AboutContainer from "./about_container";
import TimelineContainer from "./timeline_container";
import { ProtectedRoute } from "../../util/route_util";
import { Switch, Redirect } from "react-router-dom";
import EditProfileModalContainer from "./edit_profile_modal_container";
import NewPostFormContainer from "../post/new_post_form_container";


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

                    <NewPostFormContainer />
                    <EditProfileModalContainer />
                </div>
            </div>
        </div>
    )
}

export default Profile;