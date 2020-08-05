import React from "react";
import { safePush } from "../../util/navigation_util";
import { ProfileImage } from "../../util/resources_util";

const FriendIndexItem = ({ history, user, message }) => {
    return (
        <div className="item">
            {/* <img src={user.profile_photo} onClick={() => safePush(history, `/profile/${user.id}`)} /> */}

            <ProfileImage user={user} onClick={() => safePush(history, `/profile/${user.id}`)} />

            <div className="info">
                <h3>{user.first_name} {user.last_name}</h3>
                <p>Number of mutual friends.</p>
            </div>

            <button onClick={() => console.log("display dropdown") }>
                {message ? message : "Friends"}
            </button>
        </div>
    );
}

export default FriendIndexItem;