import React from "react";
import FriendIndexItem from "./friend_index_item";
import ProfileNavItemContainer from "./profile_nav_item_container";

class FriendsIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log("mount")
        // console.log(this.props.pageOwnerId);
        this.props.fetchFriendRequests(this.props.pageOwnerId).then(() => {
            this.props.fetchUsers(this.props.friendIds, this.props.pageOwnerId);
        });
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        // let newPageOwnerId = parseInt(newProps.match.params.userId);
        // if (newPageOwnerId !== this.props.pageOwnerId) {
        //     this.props.fetchFriendRequests(newPageOwnerId).then(() => {
        //         this.props.fetchUsers(this.props.friendIds, newPageOwnerId);
        //     });
        // }
    }

    render() {
        let { loggedInUser, pageOwnerId, friends, friendIds, sendFriendRequest } = this.props;
        let friendIdObj = {};
        if (friendIds) {
            friendIds.forEach(id => friendIdObj[id] = true);
        }

        return (
            <div className="friends">
                <div className="header">
                    <div className="left">
                        <h3>Friends</h3>
                    </div>

                    <div className="right">
                        { loggedInUser.id === parseInt(pageOwnerId) ?<ProfileNavItemContainer label="Friend Requests" 
                            history={this.props.history}
                            to={"/friend_requests"}/>
                        : null
                        }
                    </div>
                </div>
                <div className="friends-collection">
                    {Object.values(friends).map((user, idx) => {
                        // console.log(user.id, friendIdObj[user.id]);

                        if (friendIdObj[user.id]) {
                            return (<FriendIndexItem
                                key={idx}
                                user={user}
                                sendFriendRequest={sendFriendRequest} />
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default FriendsIndex;