import React from "react";
import ModalHeader from "./modal_header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import ProfileHeaderButton from "./profile_header_button";
import { ProfileImage } from "../../util/resources_util";
import { merge } from "lodash";

class UpdatePhotoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photoFile: null,
            photoUrl: this.props.user.profile_photo,
            description: ""
        };

        this.handlePhoto = this.handlePhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addFrameHandler = this.addFrameHandler.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    handlePhoto(e) {
        e.preventDefault();

        const reader = new FileReader();
        const photo = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ photoFile: photo, photoUrl: reader.result });
        }

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            alert("Something went wrong!");
        }
    }

    onTextChange(e) {
        e.preventDefault();
        this.setState({ description: e.target.value });
    }

    addFrameHandler(e) {
        e.preventDefault();
        console.log("Feature will be added in a later release.");
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user[profile_photo]", this.state.photoFile);
        this.props.updateUserFromFormData(this.props.user.id, formData).then(() => {
            this.props.popModal();
        }, () => {
            alert("Oops! Something went wrong!");
        });
    }

    render() {
        let { user, popModal } = this.props;
        let { photoUrl } = this.state;
        return (
            <div className="update-photo-modal">
                <form>
                    <ModalHeader title="Update Profile Picture"
                        onExitClick={() => this.props.popModal()} />

                    <div className="header">

                        <div className="item">
                            <label htmlFor="profile-photo-input">
                                <FontAwesomeIcon
                                    icon={faPlus} />
                                    Upload Photo
                            </label>
                            <input id="profile-photo-input" type="file"
                                onChange={this.handlePhoto} />
                        </div>
{/* 
                        <ProfileHeaderButton
                            icon={faAddressBook}
                            message="Add Frame"
                            onClick={this.addFrameHandler} /> */}
                    </div>

                    <ProfileImage user={{ profile_photo: photoUrl }} />

                    <div className="footer">
                        <button
                            type="submit"
                            onClick={this.handleSubmit}
                            className="blue">Save</button>

                        <button type="submit"
                            onClick={() => {
                                this.props.receiveUser({ 
                                    id: user.id, 
                                    profile_photo: user.profile_photo 
                                });
                                popModal();
                            }}>Cancel</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default UpdatePhotoModal;