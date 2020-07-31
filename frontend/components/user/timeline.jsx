import React from "react";
import PostItem from "../post/post_item";
import PostIndex from "../post/post_index";

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
        $(".post-modal-new").css("display", "flex");

    }

    componentDidMount() {
        // this.props.fetchPosts();
    }

    render() {
        let { user, posts } = this.props;

        let profile_pic = user.profile_picture ? user.profile_picture : "https://img.icons8.com/ios-glyphs/96/000000/gender-neutral-user.png";

        return (
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
                    Posts
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
        )

    }
}

export default Timeline;