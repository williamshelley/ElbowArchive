
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import { Link } from "react-router-dom";
import { ProfileImage } from "../../util/resources_util";
import { safePush } from "../../util/navigation_util";

const PostItem = ({ post, path }) => {
    let { author, wall, photos } = post;
    let moment = new Moment(post.date_posted);
    let numCharsBeforeResize = 60;
    let style = {}
    if (post.body.length > numCharsBeforeResize) {
        style = { fontSize: "15px" };
    }
    let TO = (destinationId) => `/profile/${destinationId}`;
    return (
        <div className="section">
            <div className="post">
                <div className="header">
                    <div className="h-stack">
                        {/* <img src={author.profile_photo} /> */}
                        <ProfileImage user={author}/>
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
                {
                    <ul>
                        {photos ? photos.map((photo, idx) => <img key={idx} src={photo} />) : null
                        }
                    </ul>
                }
            </div>
        </div>
    );
}

export default PostItem;