import React from "react";
import ModalHeader from "./modal_header";
import UpdatePhotoModal from "./update_photo_modal";
import { ProfileImage } from "../../util/resources_util";

const Section = ({ children }) => (
    <div className="section">{children}</div>
);

class EditProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user

        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // this.props.updateUser(this.state);
        this.props.fetchUser(this.props.user.id).then(() => {
            this.props.popModal();
        });
    }

    hideForm(e) {
        e.preventDefault();
        this.props.fetchUser(this.props.user.id).then(() => {
            this.props.popModal();
        });
    }

    render() {
        let { user, receiveUser, popModal, pushModal, updateUserFromFormData } = this.props;
        
        return (
            <div className="edit-modal">
                <form onSubmit={this.handleSubmit}>
                    <ModalHeader title="Edit Profile" 
                        onExitClick={this.hideForm}/>
                        
                    <Section>Profile Picture
                        <div className="profile">
                            <ProfileImage user={user} />
                            <button onClick={() => pushModal(
                            <UpdatePhotoModal user={user}
                            receiveUser={receiveUser}
                            updateUserFromFormData={updateUserFromFormData}
                            popModal={popModal}/>)}>
                            Edit
                            </button>
                        </div>
                    </Section>
                    <Section>Cover Photo</Section>
                    <Section>Bio</Section>
                    <Section>Customize Your Intro</Section>
                    <Section>Featured</Section>
                    <button type="submit">Edit Your About Info</button>
                </form>
            </div>
        );
    }
}

export default EditProfileModal;