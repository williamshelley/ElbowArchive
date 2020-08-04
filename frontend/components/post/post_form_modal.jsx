import React from "react";
import ModalHeader from "../user/modal_header";
import Moment from "moment";
import { text } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";

class PostFormModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.post;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.hide = this.hide.bind(this);
        this.appendPhoto = this.appendPhoto.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            const textarea = $("textarea#resizable");
            const handler = () => {
                const maxCharsPerRow = 60;
                const numChars = textarea.val().length;
                let newNumRows = Math.ceil(numChars / maxCharsPerRow);
                if (numChars > 20) {
                    textarea.css("font-size", "16px");
                } else {
                    textarea.css("font-size", "24px");
                }
                textarea.attr("rows", newNumRows);
            };
            textarea.on("keypress", handler);
            textarea.on("keyup", handler);
            textarea.on("keydown", handler);
        });
    }

    handleInput(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let now = new Moment();
        let year = now.year();
        let month = now.month();
        let day = now.toDate().getDate();

        const post = new FormData();
        post.append("post[body]", this.state.body);
        post.append("post[wall_id]", this.props.match.params.userId);
        post.append("post[date_posted]", [year, month, day].join("-"));

        let {photos} = this.state;
        for (let i = 0; i < photos.length; i++) {
            post.append("post[photos][]", photos[i]);
          }
        // post.append("post[photos]", this.state.photos);

        // const post = {
        //     body: this.state.body,
        //     wall_id: this.props.match.params.userId,
        //     date_posted: [year, month, day].join("-"),
        //     photos: this.state.photos
        // };


        this.props.submitPost(post).then(() => {
            // this.props.receivePost(post);
            this.props.popModal();
        }, () => {
            alert("Oops! Something went wrong!");
        });
    }

    appendPhoto(e) {
        e.preventDefault();

        let newPhotos = this.state.photos;
        newPhotos.push(e.target.files[0]);
        this.setState({ photos: newPhotos });
    }

    hide(e) {
        e.preventDefault();
        this.props.popModal();
    }

    render() {
        let { className, title, submitBtnName } = this.props;
        let { body } = this.state;
        let hasContent = body.length > 0;
        let submitBg = !hasContent ? "rgba(255, 255, 255, 0.3)" : "#1877f2";
        let submitStyle = {
            backgroundColor: submitBg
        };
        return (
            <div className={className}>
                <form id="new" onSubmit={this.handleSubmit}>
                    <ModalHeader title={title} onExitClick={this.hide} />
                    <textarea
                        id="resizable"
                        rows={this.initialNumRows}
                        value={body}
                        placeholder="What's on your mind?"
                        onChange={this.handleInput("body")}
                    />

                    {/* <ul>
                        { photos.map(photo => <img src={photo} />)}
                    </ul> */}

                    <div className="options">
                        <p>Add to Your Post</p>
                        <div>
                            <div className="icon">
                                <label htmlFor="file-input">
                                    <FontAwesomeIcon
                                        icon={faPhotoVideo} />
                                </label>
                                <input id="file-input"
                                    onChange={this.appendPhoto}
                                    type="file" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={submitStyle}
                        disabled={!hasContent}>
                        {submitBtnName}
                    </button>
                </form>
            </div>
        );
    }
}

export default PostFormModal;