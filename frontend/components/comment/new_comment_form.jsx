import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { addTextResizableListener } from "../../util/jquery_util";
import { merge } from "lodash";

class NewCommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: this.props.comment,
            textAreaStyle: { lineHeight: 0 }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

        this.id = uuidv4();
    }

    componentDidMount() {
        addTextResizableListener(this.id, 65, "no resize");
    }

    handleSubmit(e) {
        if (e.key === 'Enter' || e.which === 13) {
            this.props.createComment(this.state.comment).then(() => {
                const newComment = merge({}, this.props.comment, { body: "" });
                this.setState({ comment: newComment });
            });
        }
    }

    handleInput(e) {
        e.preventDefault();
        const newComment = merge({}, this.props.comment, { body: e.target.value });
        this.setState({ comment: newComment });
    }

    render() {
        let { body } = this.state.comment;
        let { textAreaStyle } = this.state;
        return (
            <div className="new-comment">
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        id={`resizable-${this.id}`}
                        type="text"
                        value={body}
                        style={textAreaStyle}
                        placeholder="What's on your mind?"
                        onChange={this.handleInput}
                        onKeyPress={this.handleSubmit}
                        onFocus={() => {
                            if (textAreaStyle.lineHeight !== "25px") {
                                this.setState({
                                    textAreaStyle: {
                                        lineHeight: "25px"
                                    }
                                })
                            }
                        }}
                        onBlur={() => {
                            if (body.length <= 0) {
                                this.setState({
                                    textAreaStyle: {
                                        lineHeight: "0px"
                                    }
                                })
                            }
                        }}
                    />
                </form>
            </div>
        );
    }
}

export default NewCommentForm;