
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faEllipsisH, faThumbsUp, faComment, faShareAlt, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import { Link } from "react-router-dom";
import { ProfileImage } from "../../util/resources_util";
import ProfileHeaderButton from "../user/profile_header_button";
import CommentContainer from "../comment/comment_container";
import NewCommentFormContainer from "../comment/new_comment_form_container";

class PostItem extends React.Component {
    constructor(props) {
        super(props);

        this.likeHandler = this.likeHandler.bind(this);
        this.commentHandler = this.commentHandler.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onUnlike = this.onUnlike.bind(this);
    }

    onLike(e) {
        e.preventDefault();
        this.props.likePost(this.props.post.id);
    }

    onUnlike(e) {
        e.preventDefault();
        this.props.unlikePost(this.props.likeId);
    }

    likeHandler(liked) {
        if (liked) {
            return this.onUnlike;
        }
        return this.onLike;
    }

    commentHandler(e) {
        e.preventDefault();
        console.log("Comment Handler");
    }

    render() {
        let { post, isLikedByCurrentUser } = this.props;
        let { author, wall, photos } = post;
        let numCharsBeforeResize = 60;
        let style = {};
        let TO = (destinationId) => `/profile/${destinationId}`;
        let numLikes = 0;

        let moment = new Moment(post.date_posted);
        if (post && post.body) {
            if (post.body.length > numCharsBeforeResize) {
                style = { fontSize: "15px" };
            }
            if (post.likes) {
                numLikes = Object.keys(post.likes).length;
            }
        }

        let likeButtonStyle = isLikedByCurrentUser ? ({
            color: "#1877f2"
        }) : ({
            color: "#B1B3B8"
        });

        return (
            <div className="section">
                <div className="post">
                    <div className="header">
                        <div className="h-stack">
                            <ProfileImage user={author} />
                            <div className="v-stack">
                                <div className="post-info">
                                    <Link className="link" to={TO(author.id)}>
                                        {author.first_name} {author.last_name}
                                    </Link>

                                    <FontAwesomeIcon icon={faCaretRight} />

                                    <Link className="link" to={TO(wall.id)}>
                                        {wall.first_name} {wall.last_name}
                                    </Link>
                                </div>
                                <div className="date-posted">
                                    {Moment.monthsShort(moment.month())} {moment.toDate().getDate()}
                                </div>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </div>
                        </div>
                    </div>
                    <p style={style}>{post.body}</p>
                    {photos && photos.length > 0 ?
                        (<ul>
                            {photos.map((photo, idx) => <img key={idx} src={photo} />)
                            }
                        </ul>)
                        : null
                    }
                    {(post.likes && numLikes > 0) ? `${numLikes} others` : null}
                    <div className="buttons">

                        <ProfileHeaderButton icon={faThumbsUp} message="Like"
                            style={likeButtonStyle}
                            onClick={this.likeHandler(isLikedByCurrentUser)} />

                        <ProfileHeaderButton icon={faComment} message="Comment"
                            onClick={this.commentHandler} />

                        <ProfileHeaderButton icon={faShareSquare} message="Share"onClick={this.commentHandler} />
                    </div>

                    {post.comments ? (
                        <div className="comments-list">

                            {Object.values(post.comments).map(comment => (
                                <CommentContainer key={comment.id} 
                                    comment={comment} />
                            ))}
                            
                        </div>
                    ) : null}

                    <NewCommentFormContainer parentId={post.id}
                        parentType="Post" />
                </div>
            </div>
        );
    }
}

export default PostItem;