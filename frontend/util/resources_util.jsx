import React from "react";

export const MaleProfileImage = ({ onClick }) => (<img 
    onClick={onClick}
    src="https://user-images.githubusercontent.com/38144750/92240880-4d1f8e80-ee8b-11ea-96fa-a41244bf343a.png" />);

export const FemaleProfileImage = ({ onClick }) => (<img 
    onClick={onClick}
    src="https://user-images.githubusercontent.com/38144750/92240880-4d1f8e80-ee8b-11ea-96fa-a41244bf343a.png" />);

export const DefaultProfileImage = ({ user, onClick }) => {
    if (user.gender === "Male") {
        return (<MaleProfileImage onClick={onClick} />);
    } else {
        return (<FemaleProfileImage onClick={onClick} />);
    }
}

export const ProfileImage = ({ user, onClick }) => {
    
    if (user.profile_photo) {
        return (<img onClick={onClick} src={user.profile_photo}/>);
    } else {
        return (<DefaultProfileImage user={user} onClick={onClick}/>);
    }
}