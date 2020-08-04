import React from "react";
import FriendRequestIndexItem from "./friend_request_index_item";

class FriendRequestIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers().then(() =>{
            console.log(this.props.nonFriends);
        });
    }

    render() {
        let { currentUser, nonFriends } = this.props;
        return (
            <div className="friend-requests">
                <div className= "friend-requests-list">
                    { nonFriends.map((user, idx) => {
                        return (
                            <FriendRequestIndexItem key={idx} user={user}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default FriendRequestIndex;