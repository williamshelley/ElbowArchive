import React from "react";

const Timeline = ({ user, posts }) => {
    return (
        <div className="timeline">
            <div className="left">
                <div className="section">
                    Intro
                </div>

                <div className="section">
                    Photos
                </div>

                <div className="section">
                    Friends
                </div>

                <div className="section">
                    Life Events
                </div>
            </div>

            <div className="right">
                Posts
                <ul className="posts-list">
                    { posts ? posts.map(post => <div>{post.id}</div>) : null }
                </ul>
            </div>
        </div>
    )
}

export default Timeline;