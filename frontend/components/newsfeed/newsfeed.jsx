import React from "react";
import PostIndex from "../post/post_index";

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPosts(this.props.currentUser.id);
    }

    render() {
        let { posts } = this.props;

        console.log(posts);
        return (
            <div className="newsfeed">
                <PostIndex posts={posts}/>
            </div>
        )
    }
}

export default NewsFeed;