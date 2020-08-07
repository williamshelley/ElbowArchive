import React from "react";
import FriendIndexItem from "./friend_index_item";
import ProfileNavItemContainer from "./profile_nav_item_container";
import { merge } from "lodash";

class FriendsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { currentUser, pageOwnerId, match,
            fetchFriendRequests, fetchMergeFriendRequests } = this.props;

        let userId = match ? match.params.userId : undefined;
        userId = userId ? parseInt(userId) : undefined;
        let pageOwnerIdInt = pageOwnerId;
        let shouldNotMerge = userId || (currentUser.id === pageOwnerIdInt);
        const action = shouldNotMerge ? fetchFriendRequests : fetchMergeFriendRequests;


        action(this.props.pageOwnerId).then((action) => { 
            let { match, fetchUsers } = this.props;
            let accepted = action.friendRequests.accepted;
            let pending = action.friendRequests.pending;
            let requests = merge({}, accepted, pending);
            let userIds = Object.values(requests).map(req => {
                if (req.sender_id === pageOwnerId) {
                    return req.recipient_id;
                } else if (req.recipient_id === pageOwnerId) {
                    return req.sender_id;
                }
            });
            if (match.params.userId) {
                fetchUsers(userIds, pageOwnerId);
            }
        });
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