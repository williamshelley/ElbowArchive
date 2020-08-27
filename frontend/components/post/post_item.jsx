
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

        return author ? (
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
                    { (post.likes && numLikes > 0) ?
                    <div className="num-likes">
                        <img src={LIKE_SVG} />
                        { `${numLikes}` }
                    </div> : null }

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
        ) : null;
    }
}

export default PostItem;

const LIKE_SVG = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e";