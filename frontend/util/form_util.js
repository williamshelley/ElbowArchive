import * as style from "../styles/session";


export const handleBadInput = ({ field, message, props }) => {
    return e => {
        e.preventDefault();
        let input = $(e.target);
        if (input) {
            if (e.target.value.length <= 0) {
                input.css("border", style.ERROR_INPUT_BORDER);
                props.receiveError(field, message);
            } else {
                input.css("border", style.INPUT_BORDER);
                props.removeError(field);
            }
        }
    }
}

export const errorMessage = (field) => { 
    switch(field) {
        case "first_name": 
            return "What's your name?"; 
        case "last_name": 
            return "What's your name?";
        case "username": 
            // return "You'll use this when you log in and if you ever need to reset your password.";
            return "Enter a valid email or phone number.";
        case "password": 
            // return "Enter a combination of at least six letters and punctuation markes (like ! and &).";
            return "Enter least 6 letters.";
        default: 
            return "Bad input.";
    }
}