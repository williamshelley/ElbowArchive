import React from "react";
import ProfileHeaderContainer from "../user/profile_header_container";
import TimelineContainer from "../user/timeline_container";
import AboutContainer from "../user/about_container";
import About from "../user/about";
import FriendsIndexContainer from "../user/friends_index_container";

const TIMELINE = "TIMELINE";
const ABOUT = "ABOUT";
const FRIENDS = "FRIENDS";

class ProfileModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mountedUser: this.props.user,
            mountedComponent: null
        }

        this.changeComponent = this.changeComponent.bind(this);
        this.chooseComponent = this.chooseComponent.bind(this);
    }

    chooseComponent(name, user) {
        switch (name) {
            case TIMELINE:
                return <TimelineContainer user={user} />
            // case ABOUT:
            //     return <AboutContainer user={user} />
            case FRIENDS:
                return <FriendsIndexContainer user={user} />
            default:
                return null;
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.user.id).then(() => {
            this.setState({
                mountedUser: this.props.user,
                mountedComponent: this.chooseComponent(TIMELINE, this.props.user),
            });
        });
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props.user.id !== newProps.user.id) {
            this.props.fetchUser(newProps.user.id).then(() => {
                this.setState({
                    mountedUser: newProps.user,
                    mountedComponent: this.chooseComponent(TIMELINE, newProps.user),
                });
            });
        }
    }

    changeComponent(name) {
        return e => this.setState({
            mountedComponent: this.chooseComponent(name, this.state.mountedUser)
        });
    }

    render() {
        let { user } = this.props;
        let PATH = (next) => `/profile/:userId/${next ? next : ""}`;
        let { mountedUser, mountedComponent } = this.state;
        return mountedUser ? (
            <div className="profile">
                <div className="profile-modal">

                    <ProfileHeaderContainer user={user}>

                        <button onClick={this.changeComponent(TIMELINE)}>
                            Timeline
                        </button>

                        {/* <button onClick={this.changeComponent(ABOUT)}>
                            About
                        </button> */}

                        <button onClick={this.changeComponent(FRIENDS)}>
                            Friends
                        </button>

                    </ProfileHeaderContainer>

                    <div className="body">
                        <div className="content">
                            {mountedComponent}
                        </div>
                    </div>
                </div>
            </div>

        ) : null;
    }
}


export default ProfileModal;