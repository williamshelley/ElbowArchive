import React from "react";
import ProfileNavItemContainer from "./profile_nav_item_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import EditProfileModalContainer from "./edit_profile_modal_container";
import { PROFILE_PATH } from "../../util/path_util";

const ProfileHeader = ({ loggedInUser, user, pushModal }) => {
    const presentEditModal = (e) => {
        e.preventDefault();
        pushModal(<EditProfileModalContainer />);
    }

    // const PATH = PROFILE_PATH.bind(this, user);
    const PATH = (next) => `/profile/${user.id}/${next ? next : ""}`;
    const isMyProfile = loggedInUser === user;

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
                            to={PATH()} />

                        <ProfileNavItemContainer label="About"
                            to={PATH("about")} />

                        <ProfileNavItemContainer label="Friends"
                            to={PATH("friends")} />

                        <ProfileNavItemContainer label="Photos"
                            to={PATH("photos")} />

                        <ProfileNavItemContainer label="Archive"
                            to={PATH("archive")} />

                        {
                            // more dropdown
                        }
                    </div>

                    <div className="right">
                        { isMyProfile ?
                            <div className="item" onClick={presentEditModal}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                            Edit Profile
                        </div>
                        : 
                        <div className="item" 
                            onClick={() => {console.log("add friend")}}>
                                <FontAwesomeIcon icon={faUserPlus} />
                                Add Friend
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;