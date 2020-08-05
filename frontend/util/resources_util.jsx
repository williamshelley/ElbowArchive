import React from "react";

export const MaleProfileImage = ({ onClick }) => (<img 
    onClick={onClick}
    src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.30497-1/c141.0.480.480a/p480x480/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&amp;_nc_sid=7206a8&amp;_nc_ohc=w5Y9C7e_m3AAX_c-30T&amp;_nc_ht=scontent-lga3-1.xx&amp;oh=fcb1231ea6ccd2434567bda6e135c99d&amp;oe=5F506E88" />);

export const FemaleProfileImage = ({ onClick }) => (<img 
    onClick={onClick}
    src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.30497-1/c141.0.480.480a/p480x480/84688533_170842440872810_7559275468982059008_n.jpg?_nc_cat=1&amp;_nc_sid=7206a8&amp;_nc_ohc=qgCFubWXKj4AX-mkMh3&amp;_nc_ht=scontent-lga3-1.xx&amp;oh=c97a671bc2cff63916538047bba89c76&amp;oe=5F515558" />);

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