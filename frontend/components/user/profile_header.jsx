import React from "react";
import ProfileNavItemContainer from "./profile_nav_item_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileHeader = ({ user }) => {
    const presentEditModal = (e) => {
        e.preventDefault();
        $(".edit-modal").css("display", "flex");
    }

    return (
        <div className="header">
            <div className="content">
                <div className="photos">
                    <div className="cover-photo">
                        <img src={user.cover_photo} style={user.cover_photo ? {} : {height: "35vw"}}/>
                    </div>

                    <div className="profile-photo">
                        <img src={user.profile_photo} />
                    </div>
                </div>

                <div className="bio">
                    <h1>{user.first_name} {user.last_name}</h1>
                </div>

                <div className="navigation">

                    <div className="left">
                        <ProfileNavItemContainer label="Timeline"
                            to="/profile" />

                        <ProfileNavItemContainer label="About"
                            to="/profile/about" />

                        <ProfileNavItemContainer label="Friends"
                            to="/profile/friends" />

                        <ProfileNavItemContainer label="Photos"
                            to="/profile/photos" />

                        <ProfileNavItemContainer label="Archive"
                            to="/profile/archive" />

                        {
                            // more dropdown
                        }
                    </div>

                    <div className="right">
                        <div className="item" onClick={presentEditModal}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                            Edit Profile
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;