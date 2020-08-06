import React from "react";
import ProfileHeader from "./profile_header";
import AboutContainer from "./about_container";
import TimelineContainer from "./timeline_container";
import { ProtectedRoute } from "../../util/route_util";
import { Switch, Redirect } from "react-router-dom";
import { PROFILE_PATH } from "../../util/path_util";
import { render } from "react-dom";
import ProfileHeaderContainer from "./profile_header_container";
import FriendsIndexContainer from "./friends_index_container";
import { safePush } from "../../util/navigation_util";


class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mountedUser: this.props.user
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId).then(() => {
            this.setState({ mountedUser: this.props.user });
        });
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        let newId = newProps.match.params.userId;
        let oldId = this.props.match.params.userId;
        let oldUser = this.props.user;
        let newUser = newProps.user;
        let bothProfilePhotosExist = oldUser && newUser;
        let profilePhotosAreSame = bothProfilePhotosExist ? (oldUser.profile_photo == newUser.profile_photo) : bothProfilePhotosExist;
        var numbers = /^[0-9]+$/;

        if ((newId && !newId.match(numbers)) 
            || (oldId && !oldId.match(numbers))) {
            safePush(this.props.history, "/invalid-user");
        }

        if (newId !== oldId || !profilePhotosAreSame) {
            this.props.fetchUser(newId).then(() => {
                this.setState({ mountedUser: newProps.user });
            });
        }
    }

    render() {
        let { user, loggedInUser, topModal, modals, pushModal } = this.props;
        let PATH = (next) => `/profile/:userId/${next ? next : ""}`;
        let { mountedUser } = this.state;
        return mountedUser ? (
            <div className="profile">

                {/* <ProfileHeader loggedInUser={loggedInUser} user={user} pushModal={pushModal} /> */}
                <ProfileHeaderContainer user={mountedUser}/>

                <div className="body">
                    <div className="content">
                        <Switch>

                            <ProtectedRoute exact path={PATH()}
                                component={TimelineContainer} />

                            <ProtectedRoute exact path={PATH("about")}
                                component={AboutContainer} />

                            <ProtectedRoute exact path={PATH("friends")}
                                component={FriendsIndexContainer} />

                            <Redirect to="/page-not-found" />

                        </Switch>

                        {topModal}
                    </div>
                </div>
            </div>

        ) : null;
    }
}


export default Profile;