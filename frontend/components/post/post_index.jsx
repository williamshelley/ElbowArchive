import React from "react";
import PostItem from "./post_item";
import PostItemContainer from "./post_item_container";

const PostIndex = ({ posts }) => {
    const sortedByDate = posts ? (posts.sort((postA, postB) => {
        const dateA = new Date(postA.date_posted);
        const dateB = new Date(postB.date_posted);
        return dateB - dateA;
    })) : [];

    return posts ? (
        <div className="posts-list">
            {sortedByDate.map((post, idx) => {
                return (
                    <PostItemContainer key={idx} post={post} />
                );
            })}
        </div>
    ) : null;
};

export default PostIndex;