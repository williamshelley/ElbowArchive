
import React from "react"; 

const PostItem = ({ post }) => {
    let { author, wall } = post;
    return (
        <div className="section">
            <div className="post">
                <div className="header">
                    {author.first_name} {author.last_name} to {wall.first_name} {wall.last_name}
                </div>
                <p>{post.body}</p>
            </div>
        </div>
    );
}

export default PostItem;