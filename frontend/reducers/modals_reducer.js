import { POP_MODAL, PUSH_MODAL } from "../actions/ui_actions";
import { merge } from "lodash";

const modalsReducer = (state = [null], action) => {
    Object.freeze(state);
    let newState = merge([], state);
    switch(action.type) {
        case PUSH_MODAL:
            newState.push(action.modal);
            return newState;
        case POP_MODAL:
            if (newState.length > 1) {
                newState.pop();
            }
            return newState;
        default:
            return state;
    }
};

export default modalsReducer;