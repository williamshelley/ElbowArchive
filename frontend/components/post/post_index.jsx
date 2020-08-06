import React from "react";
import PostItem from "./post_item";
import PostItemContainer from "./post_item_container";

const PostIndex = ({ posts, currentPath }) => {
    return posts ? (
        <div className="posts-list">
            { posts.map((post, idx) => <PostItemContainer key={idx} post={post} />) }
        </div>
    ) : null;
};

export default PostIndex;