import React from "react";
import PostIndex from "../post/post_index";
import { Waypoint } from 'react-waypoint';
import { ProfileImage } from "../../util/resources_util";
import { safePush } from "../../util/navigation_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faAngellist } from "@fortawesome/free-brands-svg-icons";
import { faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import { GITHUB, LINKEDIN, ANGELLIST, PERSONAL } from "../../util/sites";

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        }
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.currentUser;
        this.props.fetchSuggestedFriends().then(() => {
            this.props.fetchPosts(id);
        });
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

    navigate(user) {
        return () => {
            safePush(this.props.history, `/profile/${user.id}`);
        }
    }

    render() {
        let { posts, suggested } = this.props;

        return (
                <div className="newsfeed">
                    <div className="about-me-slider">
                        <h2>Welcome to Elbow Archive!</h2>
                        <h3>Search for users, make friends, and post amazing photos!</h3>
                        <h3>Learn more about the creator from these links:</h3>
                        <div>
                            <a href={GITHUB}>
                                <FontAwesomeIcon icon={faGithub} />
                                GitHub
                            </a>
                            
                            <a href={PERSONAL}>
                                <FontAwesomeIcon icon={faPersonBooth} />
                                Personal Site
                            </a>

                            <a href={LINKEDIN}>
                                <FontAwesomeIcon icon={faLinkedin} />
                                LinkedIn
                            </a>

                            <a href={ANGELLIST}>
                                <FontAwesomeIcon icon={faAngellist} />
                                AngelList
                            </a>
                        </div>
                    </div>
                    <PostIndex posts={posts}/>
                    { posts && posts.length > 1 && <Waypoint onEnter={() => this.getOnScrollDownPosts()} /> }
                    <div className="suggested-friends">
                        <h3>Suggested Friends</h3>
                        { suggested && suggested.map((friend, idx) => {
                            return (<div key={idx} onClick={this.navigate(friend)}>
                                <ProfileImage user={friend} />
                                <h3>{friend.first_name} {friend.last_name}</h3>
                            </div>);
                        }) }
                    </div>


            </div>
        );
    }
}

export default NewsFeed;