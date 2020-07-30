import React from "react";
import ProfileNavItemContainer from "./profile_nav_item_container";

const COVER_PHOTO = "https://upload.wikimedia.org/wikipedia/commons/3/38/Hogwarts_model_studio_tour.jpg";

const PROFILE_PHOTO = "https://images.ctfassets.net/usf1vwtuqyxm/2PY5u8jWLYSleOz1yFmdnV/28ac9117961a02ec65c9cd7ae3bc87eb/hpah_HP4_JKT_BC__1_.jpg?fm=jpg";

const ProfileHeader = ({ user }) => {
    return (
        <div className="header">
            <div className="content">
                <div className="photos">
                    <div className="cover-photo">
                        <img src={COVER_PHOTO} />
                    </div>

                    <div className="profile-photo">
                        <img src={PROFILE_PHOTO} />
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
                        right
                </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;