import React from "react";
import ModalHeader from "../user/modal_header";
import Moment from "moment";
import { text } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import { addTextResizableListener } from "../../util/jquery_util";

class PostFormModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.post;
        this.state.photoUrls = [];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.hide = this.hide.bind(this);
        this.appendPhoto = this.appendPhoto.bind(this);

        this.id = uuidv4();
    }

    componentDidMount() {
        addTextResizableListener(this.id, 77);
    }

    handleInput(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const post = new FormData();
        post.append("post[body]", this.state.body);
        post.append("post[wall_id]", this.props.match.params.userId);
        let date = new Date();
        post.append("post[date_posted]", date.toString());

        let { photos } = this.state;
        for (let i = 0; i < photos.length; i++) {
            post.append("post[photos][]", photos[i]);
        }

        this.props.submitPost(post).then(() => {
            this.props.popModal();
        }, () => {
            alert("Oops! Something went wrong!");
        });
    }

    appendPhoto(e) {
        e.preventDefault();

        const reader = new FileReader();
        const photo = e.target.files[0];
        reader.onloadend = () => {
            let newPhotoUrls = this.state.photoUrls;
            newPhotoUrls.push(reader.result);

            let newPhotos = this.state.photos;
            newPhotos.push(photo);

            this.setState({ photos: newPhotos,  photoUrls: newPhotoUrls });
        }

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            alert("Something went wrong!");
        }
    }

    hide(e) {
        e.preventDefault();
        this.props.popModal();
    }

    render() {
        let { className, title, submitBtnName } = this.props;
        let { body, photoUrls } = this.state;
        let hasContent = body.length > 0;
        let submitBg = !hasContent ? "rgba(255, 255, 255, 0.3)" : "#1877f2";
        let submitStyle = { backgroundColor: submitBg };
        return (
            <div className={className}>
                <form id="new" onSubmit={this.handleSubmit}>
                    <ModalHeader title={title} onExitClick={this.hide} />
                    <textarea
                        id={`resizable-${this.id}`}
                        rows={this.initialNumRows}
                        value={body}
                        placeholder="What's on your mind?"
                        onChange={this.handleInput("body")}
                    />

                    {photoUrls.length > 0 ?
                        (<div className="image-previews">
                            {photoUrls.map((url,idx) => <img key={idx} src={url} />)}
                        </div>)
                        : null
                    }

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