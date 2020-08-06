import React from "react";
import ProfileNavItemContainer from "./profile_nav_item_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUserPlus, faUserCheck, faRetweet, faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import EditProfileModalContainer from "./edit_profile_modal_container";
import { ProfileImage } from "../../util/resources_util";
import ProfileHeaderButton from "./profile_header_button";

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);

        this.presentEditModal = this.presentEditModal.bind(this);
        this.addFriendHandler = this.addFriendHandler.bind(this);
        this.removeFriendHandler = this.removeFriendHandler.bind(this);
        this.friendButton = this.friendButton.bind(this);
    }

    componentDidMount() {
        this.props.fetchFriends(this.props.user.id);
    }

    presentEditModal(e) {
        e.preventDefault();
        this.props.pushModal(<EditProfileModalContainer />);
    }

    addFriendHandler(e) {
        e.preventDefault();

        //NEED TO UPDATE THIS LOGIC, NEVER PRINTS AS IT IS RIGHT NOW
        if (this.props.isFriended) {
            console.log("Already friends!")
        } else {
            this.props.sendFriendRequest({ recipient_id: this.props.user.id });
        }
    }

    removeFriendHandler(e) {
        e.preventDefault();
        console.log("remove friend");
    }

    friendButton(isMyProfile) {
        if (isMyProfile) {
            return (
                <ProfileHeaderButton icon={faPencilAlt}
                                    message="Edit Profile"
                                    onClick={this.presentEditModal} />
            );
        } else {

            if (this.props.isPendingFriend || this.props.isFriended) {
                let { isFriended } = this.props;
                return (<ProfileHeaderButton icon={isFriended ? faUserCheck : faRedoAlt}
                    message={isFriended ? "Friends" : "Pending Request"}
                    onClick={this.removeFriendHandler} />);
            } else {
                return (<ProfileHeaderButton icon={faUserPlus}
                message="Add Friend"
                onClick={this.addFriendHandler} />);
            }
        }
    }

    render() {
        let { PATH, loggedInUser, user, children, isPendingFriend } = this.props;
        const isMyProfile = loggedInUser.id === user.id;

        return (
            <div className="header">
                <div className="content">
                    <div className="photos">
                        <div className="cover-photo">
                            <img src={user.cover_photo} style={user.cover_photo ? {} : { color: "transparent", height: "35vw" }} />
                        </div>

                        <div className="profile-photo">
                            <ProfileImage user={user} />
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
                            { this.friendButton(isMyProfile) }
                            {/* {
                            
                            isMyProfile ?
                                <ProfileHeaderButton icon={faPencilAlt}
                                    message="Edit Profile"
                                    onClick={this.presentEditModal} />
                                : (isPendingFriend ?
                                    :
                                    <ProfileHeaderButton icon={faUserPlus}
                                        message="Add friend"
                                        onClick={this.addFriendHandler} />
                                )
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;