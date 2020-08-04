import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import postErrorsReducer from "./post_errors_reducer";
import friendRequestErrorsReducer from "./friend_request_errors_reducer";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    post: postErrorsReducer,
    friendRequest: friendRequestErrorsReducer
});

export default errorsReducer;