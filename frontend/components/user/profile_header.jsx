import React from "react";
import ProfileNavItemContainer from "./profile_nav_item_container";
import { faPencilAlt, faUserPlus, faUserCheck, faRetweet, faRedoAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import EditProfileModalContainer from "./edit_profile_modal_container";
import { ProfileImage } from "../../util/resources_util";
import ProfileHeaderButton from "./profile_header_button";

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);

        this.presentEditModal = this.presentEditModal.bind(this);
        this.addFriendHandler = this.addFriendHandler.bind(this);
        this.acceptFriendHandler = this.acceptFriendHandler.bind(this);
        this.removeFriendHandler = this.removeFriendHandler.bind(this);
        this.friendButton = this.friendButton.bind(this);
    }

    componentDidMount() {
        this.props.fetchFriend(this.props.user.id);
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props.match.params.userId !== newProps.match.params.userId) {
            this.props.fetchFriend(newProps.match.params.userId);
        }
    }

    presentEditModal(e) {
        e.preventDefault();
        this.props.pushModal(<EditProfileModalContainer />);
    }

    addFriendHandler(e) {
        e.preventDefault();
        this.props.sendFriendRequest({ recipient_id: this.props.user.id });
    }

    removeFriendHandler(e) {
        e.preventDefault();
        this.props.deleteFriendRequest(this.props.friendRequest.id);
    }

    acceptFriendHandler(e) {
        e.preventDefault();
        this.props.acceptFriendRequest(this.props.user.id).then(() => {

        });
    }

    friendButton(isMyProfile) {
        if (isMyProfile) {
            return (
                <ProfileHeaderButton icon={faPencilAlt}
                    message="Edit Profile"
                    onClick={this.presentEditModal} />
            );
        } else {
            if (this.props.friendRequest) {
                let { isFriended } = this.props;
                if (isFriended) {
                    return (<ProfileHeaderButton icon={faUserCheck}
                        message={"Friends"}
                        onClick={this.removeFriendHandler} />);
                } else {
                    if (this.props.isSenderOfRequest) {
                        return (<ProfileHeaderButton icon={faUserAlt} 
                            message={"Request Sent"}
                            onClick={this.removeFriendHandler}/>)
                    } else {
                        return (<ProfileHeaderButton icon={faUserPlus} 
                            message={"Accept Request"} 
                            onClick={this.acceptFriendHandler}/>)
                    }
                }

            } else {
                return (<ProfileHeaderButton icon={faUserPlus}
                    message="Add Friend"
                    onClick={this.addFriendHandler} />);
            }
        }
    }

    render() {
        let { PATH, loggedInUser, user, children } = this.props;
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

                                    {/* <ProfileNavItemContainer label="About"
                                        to={PATH("about")} /> */}

                                    <ProfileNavItemContainer label="Friends"
                                        to={PATH("friends")} />

                                    {/* <ProfileNavItemContainer label="Photos"
                                        to={PATH("photos")} />

                                    <ProfileNavItemContainer label="Archive"
                                        to={PATH("archive")} /> */}
                                </>)
                                : children
                            }
                        </div>

                        <div className="right">
                            {this.friendButton(isMyProfile)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;