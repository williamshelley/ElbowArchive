import React from "react";
import ModalHeader from "./modal_header";

class UpdatePhotoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            photo:this.props.user.profile_photo
        };

        this.handlePhoto = this.handlePhoto.bind(this);
    }

    handlePhoto(e) {
        e.preventDefault();
        this.setState({ photo: e.target.value }, ()=>{
            console.log(this.state);
        });
    }

    render() {
        let { user } = this.props;
        return (
            <div className="update-photo-modal">
                <form>
                    <ModalHeader title="Update Profile Picture"
                        onExitClick={() => this.props.popModal()} />


                    <img src={user.profile_photo} />

                    <div>
                        <input onChange={this.handlePhoto} type="file"/>
                    </div>

                    
                </form>
            </div>
        );
    }
}

export default UpdatePhotoModal;