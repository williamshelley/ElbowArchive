import React from "react";

const FriendIndexItem = ({ user }) => {
    return (
        <div className="item">
            <img src={user.profile_photo} />

            <div className="info">
                <p>{user.first_name} {user.last_name}</p>
                <p>Number of mutual friends.</p>
            </div>

            <button onClick={() => console.log("display dropdown") }>
                Friends
            </button>
        </div>
    );
}

export default FriendIndexItem;