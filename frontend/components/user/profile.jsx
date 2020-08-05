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
        if (newId !== oldId) {
            this.props.fetchUser(newId).then(() => {
                this.setState({ mountedUser: this.props.user });
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
                        {/* {modals.map((modal, idx) => {
                            if (modal) {
                                return (
                                    <div className="_null" key={idx}>
                                        {modal}
                                    </div>
                                );
                            } else { return null; }
                        })} */}
                    </div>
                </div>
            </div>

        ) : null;
    }
}


export default Profile;