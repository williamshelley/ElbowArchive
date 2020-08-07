import React from "react";
import { ProfileImage } from "../../util/resources_util";

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.user) {
            this.props.fetchUser(this.props.authorId);
        }
    }

    render() {
        let { comment, user } = this.props;
        return (comment && user) ? (
            <div className="comment">
                <ProfileImage user={this.props.user} />
                <div className="info">

                <h3>
                    { comment.author.first_name } { comment.author.last_name }
                </h3>

                <p>{ comment.body }</p>
                </div>

            </div>
        ) : null;
    }
}

export default Comment;