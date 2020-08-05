import React from "react";
import ProfileNavItemContainer from "./profile_nav_item_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import EditProfileModalContainer from "./edit_profile_modal_container";
import { PROFILE_PATH } from "../../util/path_util";

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);

        this.presentEditModal = this.presentEditModal.bind(this);
        this.addFriendHandler = this.addFriendHandler.bind(this);
    }

    presentEditModal(e) {
        e.preventDefault();
        this.props.pushModal(<EditProfileModalContainer />);
    }

    addFriendHandler(e) {
        e.preventDefault();
        if (this.props.isFriended) {
            console.log("Already friends!")
        } else {
            this.props.sendFriendRequest({ recipient_id: this.props.user.id });
        }
    }

    componentDidMount() {
        // this.props.fetchFriend(this.props.user.id);
    }

    render() {
        let { PATH, loggedInUser, user, children } = this.props;

        // const PATH = (next) => `/profile/${user.id}/${next ? next : ""}`;
        const isMyProfile = loggedInUser.id === user.id;

        return (
            <div className="header">
                <div className="content">
                    <div className="photos">
                        <div className="cover-photo">
                            <img src={user.cover_photo} style={user.cover_photo ? {} : { height: "35vw" }} />
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
                            {!children ?
                                (<>
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
                                </>)
                                : children
                            }
                            {
                                // more dropdown
                            }
                        </div>

                        <div className="right">
                            {isMyProfile ?
                                <div className="item" onClick={this.presentEditModal}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                Edit Profile
                            </div>
                                :
                                <div className="item"
                                    onClick={this.addFriendHandler}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    Add Friend
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;