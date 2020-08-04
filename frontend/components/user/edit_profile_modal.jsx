import React from "react";
import ModalHeader from "./modal_header";
import UpdatePhotoModal from "./update_photo_modal";

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
        this.props.updateUser(this.state);
    }

    hideForm(e) {
        e.preventDefault();
        this.props.popModal();
    }

    render() {
        let { user, topModal, popModal, pushModal } = this.props;
        console.log($(topModal));
        console.log($(this));
        let profile_pic = user.profile_img_url ? user.profile_img_url : "https://img.icons8.com/ios-glyphs/96/000000/gender-neutral-user.png";
        
        return (
            <div className="edit-modal">
                <form onSubmit={this.handleSubmit}>
                    <ModalHeader title="Edit Profile" 
                        onExitClick={this.hideForm}/>
                        
                    <Section>Profile Picture
                        <div className="profile">
                            <img src={profile_pic} />
                            <button onClick={() => pushModal(
                            <UpdatePhotoModal user={user}
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