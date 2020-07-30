import React from "react";

const About = ({ user }) => {
    return (
        <div className="body">
            <div className="content">
                {user.first_name} about body
            </div>
        </div>
    )
}

export default About;