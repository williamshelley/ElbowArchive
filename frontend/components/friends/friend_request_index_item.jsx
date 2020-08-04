import React from "react";

const FriendRequestIndexItem = ({ user }) => {
    return (
        <div className="item">
            <img src={user.profile_photo} />
            <div className="right">
                <h3>{user.first_name} {user.last_name}</h3>
                <p>Number of mutual friends</p>
                <div className="buttons">
                    <button className="add">Add Friend</button>
                    <button>Remove</button>
                </div>
            </div>
        </div>
    );
}

export default FriendRequestIndexItem;