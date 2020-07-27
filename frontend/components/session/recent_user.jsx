import React from "react";

const RecentUser = ({ user: { first_name, last_name, profile_img_url}  }) => {
    let className = "recent-user";
    return (
        <div className={className}>
            {/* <img className={`${className}-image`} src={profile_img_url} /> */}
            <p className={`${className}-name`}>{first_name} {last_name}</p>
        </div>
    );
}

export default RecentUser;