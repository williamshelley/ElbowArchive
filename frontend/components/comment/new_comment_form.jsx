import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { addTextResizableListener } from "../../util/jquery_util";
import { merge } from "lodash";

class NewCommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state =  this.props.comment;

        this.handleSubmit = this.handleSubmit.bind(this);

        this.id = uuidv4();
        this.textFocus = React.createRef();
    }

    componentDidMount() {
        // addTextResizableListener(this.id, 65, "no resize");
        $(`#${this.id}`).text("Write a comment...");
    }

    handleSubmit(e) {
        if (e.key === 'Enter' || e.which === 13) {
            const textbox = $(e.target);
            const newComment = merge({}, this.state, { body: textbox.text() })
            this.props.createComment(newComment).then(() => {
                textbox.text("Write a comment...");
                this.textFocus.blur();
            });
        }
    }

    render() {
        return (
            <div className="new-comment">
                <form onSubmit={this.handleSubmit}>
                    <p onClick={() => this.textFocus.focus() }><span
                        id={this.id}
                        ref={(focused) => this.textFocus = focused}
                        role="textbox"
                        onFocus={(e) => $(e.target).text("")}
                        onBlur={(e) => $(e.target).text("Write a comment...")}
                        onKeyPress={this.handleSubmit}
                        contentEditable
                    ></span></p>
                </form>
            </div>
        );
    }
}

export default NewCommentForm;