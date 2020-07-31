import React from "react";
import PostItem from "./post_item";

const PostIndex = ({ posts }) => {
    return posts ? (
        <div className="posts-list">
            { posts.map(post => <PostItem key={post.id} post={post} />) }
        </div>
    ) : null;
};

export default PostIndex;