import React from "react";
import FriendIndexItem from "./friend_index_item";
import ProfileNavItemContainer from "./profile_nav_item_container";

class FriendsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.fetchFriendRequests(this.props.pageOwnerId).then(() => {
        let { currentUser, pageOwnerId, user, match,
            fetchFriendRequests, fetchMergeFriendRequests } = this.props;
        let defUser = user ? user : { id: null }
        let userId = match ? match.params.userId : undefined;
        userId = userId ? parseInt(userId) : undefined;
        let pageOwnerIdInt = pageOwnerId;
        let shouldNotMerge = userId || (currentUser.id === pageOwnerIdInt);
        const action = shouldNotMerge ? fetchFriendRequests : fetchMergeFriendRequests;

        action(this.props.pageOwnerId).then(() =>{   
            if (this.props.match.params.userId) {
                this.props.fetchUsers(this.props.userIds, this.props.pageOwnerId);
            }
        });
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        // if ((newProps.pendingFriends !== this.props.pendingFriends) || 
        // newProps.acceptedFriends !== this.props.acceptedFriends) {
            // console.log(newProps);
            // this.props.fetchMergeFriendRequests(this.props.pageOwnerId);
            // debugger;
            // this.props.receiveUsers(this.props.acceptedFriends);
        // }
    }

    render() {
        let { history, currentUser, pageOwnerId, acceptedFriends, pendingFriends, sendFriendRequest } = this.props;
        return (
            <div className="friends">
                <div className="header">
                    <div className="left">
                        <h3>Friends</h3>
                    </div>

                    <div className="right">
                        { currentUser.id === pageOwnerId ?<ProfileNavItemContainer label="Friend Requests" 
                            history={history}
                            to={"/friend_requests"}/>
                        : null
                        }
                    </div>
                </div>
                <div className="friends-collection">
                    <div className="accepted">

                    {Object.values(acceptedFriends).map((user, idx) => {
                            if (user) {
                                return (<FriendIndexItem
                                    history={history}
                                    key={idx}
                                    user={user}
                                    sendFriendRequest={sendFriendRequest} />
                                    );
                                }
                            })}
                    </div>

                    <div className="pending">
                    {Object.values(pendingFriends).map((user, idx) => {
                            if (user) {
                                return (<FriendIndexItem
                                history={history}
                                message={"Pending"}
                                    key={idx}
                                    user={user}
                                    sendFriendRequest={sendFriendRequest} />
                                    );
                                }
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

export default FriendsIndex;