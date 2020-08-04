import React from "react";
import PostItem from "../post/post_item";
import PostIndex from "../post/post_index";
import NewPostFormContainer from "../post/new_post_form_container";
import NotFound404 from "../navigation/not_found_404";

const Section = ({ children }) => (
    <div className="section">{children}</div>
);

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.presentNewPostForm = this.presentNewPostForm.bind(this);
    }

    presentNewPostForm(e) {
        e.preventDefault();
        this.props.pushModal(<NewPostFormContainer />);

    }
    
    componentDidMount() {
        this.props.fetchPosts(this.props.ownerId);
        console.log("mounted")
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let nextId = nextProps.match.params.userId;
        if (nextId !== this.props.ownerId) {
            this.props.fetchPosts(nextId);
        }
    }

    render() {
        let { user, posts } = this.props;

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
                    <Section>
                        <div className="new-post">
                            <div className="top">
                                <img src={profile_pic} />
                                <button onClick={this.presentNewPostForm}>
                                    What's on your mind?
                                </button>
                            </div>

                            <div className="post-types">

                            </div>
                        </div>
                    </Section>

                    <PostIndex posts={posts} />
                </div>
            </div>
        ) : <NotFound404 />

    }
}

export default Timeline;