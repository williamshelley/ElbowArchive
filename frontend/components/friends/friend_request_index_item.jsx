import React from "react";

const FriendRequestIndexItem = ({ acceptMessage, user, onClick, addHandler, removeHandler }) => {
    return (
        <div className="item" onClick={onClick}>
            <img src={user.profile_photo} />
            <div className="right">
                <h3>{user.first_name} {user.last_name}</h3>
                <p>Number of mutual friends</p>
                <div className="buttons">
                    <button className="add" onClick={addHandler(user)}>{acceptMessage ? acceptMessage : "Add Friend"}</button>
                    <button onClick={removeHandler(user)}>Remove</button>
                </div>
            </div>
        </div>
    );
}

export default FriendRequestIndexItem;