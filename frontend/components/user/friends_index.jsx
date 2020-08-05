import React from "react";
import FriendIndexItem from "./friend_index_item";
import ProfileNavItemContainer from "./profile_nav_item_container";

class FriendsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchFriendRequests(this.props.pageOwnerId).then(() => {
            // debugger;
            if (this.props.match.params.userId) {
                // console.log(props.userIds);
                // console.log(this.props.pageOwnerId);
                this.props.fetchUsers(this.props.userIds, this.props.pageOwnerId);
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
                        { currentUser.id === parseInt(pageOwnerId) ?<ProfileNavItemContainer label="Friend Requests" 
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