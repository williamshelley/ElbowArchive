
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";

const PostItem = ({ post }) => {
    let { author, wall } = post;
    let moment = new Moment(post.date_posted);
    let numCharsBeforeResize = 60;
    let style = {}
    if (post.body.length > numCharsBeforeResize) {
        style = { fontSize: "15px"};
    }
    return (
        <div className="section">
            <div className="post">
                <div className="header">
                    <div className="h-stack">
                        <img src={author.profile_photo} />
                        <div className="v-stack">
                            <div className="post-info">
                                {author.first_name} {author.last_name}
                                <FontAwesomeIcon icon={faCaretRight} />
                                {wall.first_name} {wall.last_name}
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
            </div>
        </div>
    );
}

export default PostItem;