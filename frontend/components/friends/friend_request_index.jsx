import React from "react";
import FriendRequestIndexItem from "./friend_request_index_item";
import ProfileContainer from "../user/profile_container";
import ProfileModalContainer from "./profile_modal_container";

class FriendRequestIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mountedUser: null
        }

        this.sendRequest = this.sendRequest.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers().then(() => {
            this.props.fetchFriendRequests(this.props.currentUser.id)
        });
    }

    sendRequest(recipient) {
        return e => this.props.sendFriendRequest(recipient.id);
    }

    acceptRequest(sender) {
        return e => {
            this.props.updateFriendRequest(sender.id).then(() => {
                this.props.fetchFriendRequests(this.props.currentUser.id);
            });
        };
    }

    removeHandler(user) {
        return e => console.log("remove handler");
    }

    render() {
        let { nonFriends, pendingFriends } = this.props;
        let { mountedUser } = this.state;
        return (
            <div className="friend-requests">
                <div className="friend-requests-list">
                    <h2>Friends</h2>
                    <div className="pending-requests">
                        {pendingFriends.length > 0 ? (pendingFriends.map((user, idx) => {
                            return user ? (
                                <FriendRequestIndexItem
                                    acceptMessage="Accept"
                                    onClick={() => this.setState({ 
                                        mountedUser: user })}
                                    addHandler={this.acceptRequest}
                                    removeHandler={this.removeHandler}
                                    key={idx} user={user} />
                            ) : null;
                        }))
                            : (<p>No new requests</p>)
                        }
                    </div>

                    <h3>People you may know</h3>
                    {nonFriends.map((user, idx) => {
                        return user ? (
                            <FriendRequestIndexItem
                                onClick={() => this.setState({ 
                                    mountedUser: user })}
                                addHandler={this.sendRequest}
                                removeHandler={this.removeHandler}
                                key={idx} user={user} />
                        ) : null;
                    })}
                </div>
                {
                    mountedUser ? <ProfileModalContainer user={mountedUser} /> : null
                }
            </div>
        );
    }
}

export default FriendRequestIndex;