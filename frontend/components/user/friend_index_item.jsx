import React from "react";
import { safePush } from "../../util/navigation_util";

const FriendIndexItem = ({ history, user, message }) => {
    return (
        <div className="item">
            <img src={user.profile_photo} onClick={() => safePush(history, `/profile/${user.id}`)} />

            <div className="info">
                <p>{user.first_name} {user.last_name}</p>
                <p>Number of mutual friends.</p>
            </div>

            <button onClick={() => console.log("display dropdown") }>
                {message ? message : "Friends"}
            </button>
        </div>
    );
}

export default FriendIndexItem;