import React from "react";
import ModalHeader from "../user/modal_header";

class PostFormModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.post;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.hide = this.hide.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.props.submitPost(this.state);
    }

    hide(e) {
        e.preventDefault();
        $(`.${this.props.className}`).css("display", "none");
    }

    render() {
        let { className, title, submitBtnName } = this.props;
        return (
            <div className={className}>
                <form onSubmit={this.handleSubmit}>
                    <ModalHeader title={title} onExitClick={this.hide}/>
                    <button type="submit">{submitBtnName}</button>
                </form>
            </div>
        );
    }
}

export default PostFormModal;