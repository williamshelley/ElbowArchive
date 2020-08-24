import React from "react";
import PostIndex from "../post/post_index";
import NewPostFormContainer from "../post/new_post_form_container";
import NotFound404 from "../navigation/not_found_404";
import { ProfileImage } from "../../util/resources_util";
import { Waypoint } from "react-waypoint";

const Section = ({ style, children }) => (
    <div style={style} className="section">{children}</div>
);

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
        };

        this.presentNewPostForm = this.presentNewPostForm.bind(this);
    }

    presentNewPostForm(e) {
        e.preventDefault();
        this.props.pushModal(<NewPostFormContainer />);
    }

    componentDidMount() {
        this.props.fetchPosts(this.props.ownerId);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let nextId = nextProps.ownerId;
        if (nextId !== this.props.ownerId) {
            this.props.fetchPosts(nextId);
        }
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
        let { user, posts, ownerId, currentUser } = this.props;

        let profile_pic = "https://img.icons8.com/ios-glyphs/96/000000/gender-neutral-user.png";
        if (user) {
            profile_pic = user.profile_photo ? user.profile_photo : profile_pic;
        }

        return user ? (
            <div className="timeline">
                <div className="left">
                    <Section>
                        Intro
                    </Section>

                    <Section>
                        Photos
                    </Section>

                    <Section>
                        Friends
                    </Section>

                    <Section>
                        Life Events
                    </Section>
                </div>

                <div className="right">
                    { (currentUser.id === user.id || currentUser.id === parseInt(ownerId)) ?
                        (<Section style={{ marginBottom: "16px" }}>
                            <div className="new-post">
                                <div className="top">
                                    {/* <img src={profile_pic} /> */}
                                    <ProfileImage user={currentUser}/>
                                    <button onClick={this.presentNewPostForm}>
                                        What's on your mind?
                                </button>
                                </div>

                                <div className="post-types">

                                </div>
                            </div>
                        </Section>) : null
                    }

                    <PostIndex posts={posts} />
                    { posts && posts.length > 1 && <Waypoint onEnter={() => this.getOnScrollDownPosts()} /> }
                </div>
            </div>
        ) : <NotFound404 />

    }
}

export default Timeline;