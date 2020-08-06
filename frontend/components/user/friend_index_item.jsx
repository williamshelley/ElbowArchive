import React from "react";
import { safePush } from "../../util/navigation_util";
import { ProfileImage } from "../../util/resources_util";

const FriendIndexItem = ({ history, user, message }) => {
    const destination =`/profile/${user.id}`;
    const _navClick = e => {
        e.preventDefault();
        safePush(history, destination);
    }
    return (
        <div className="item">
            {/* <img src={user.profile_photo} onClick={() => safePush(history, `/profile/${user.id}`)} /> */}

            <ProfileImage user={user} onClick={_navClick} />

            <div className="info">
                <h3 onClick={_navClick}>{user.first_name} {user.last_name}</h3>
                <p>Number of mutual friends.</p>
            </div>

            <button onClick={() => console.log("display dropdown") }>
                {message ? message : "Friends"}
            </button>
        </div>
    );
}

export default FriendIndexItem;