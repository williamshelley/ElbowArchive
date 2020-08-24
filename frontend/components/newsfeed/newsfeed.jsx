import React from "react";
import PostIndex from "../post/post_index";
import { Waypoint } from 'react-waypoint';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        }
    }

    componentDidMount() {
        console.log("mounted");
        this.props.fetchPosts(this.props.currentUser.id);
    }

    getPosts(page) {
        this.props.mergePosts(this.props.currentUser.id, page);
    }

    getOnScrollUpPosts() {
        this.setState({ page: this.state.page - 1}, ()=> {
            this.getPosts(this.state.page);
        } );
    }

    getOnScrollDownPosts() {
        this.setState({ page: this.state.page + 1 }, () => {
            this.getPosts(this.state.page);
        });
    }

    render() {
        let { posts } = this.props;

        return (
            <div className="newsfeed">
                <PostIndex posts={posts}/>
                { posts && posts.length > 1 && <Waypoint onEnter={() => this.getOnScrollDownPosts()} /> }
            </div>
        );
    }
}

export default NewsFeed;