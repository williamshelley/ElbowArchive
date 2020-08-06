import * as LikeAPIUtil from "../util/like_api_util";

export const RECEIVE_LIKE = "RECEIVE_LIKE";

export const DELETE_LIKE = "DELETE_LIKE";

export const RECEIVE_LIKE_ERRORS = "RECEIVE_LIKE_ERRORS";

export const receiveLike = like => ({
    type: RECEIVE_LIKE,
    like
});

export const receiveErrors = errors => ({
    type: RECEIVE_LIKE_ERRORS,
    errors
});

export const deleteLike = like => ({
    type: DELETE_LIKE,
    like
});

export const like = likeable => dispatch => (
    LikeAPIUtil.like(likeable)
        .then(
            payload => dispatch(receiveLike(payload)),
            err => dispatch(receiveErrors(err.responseJSON)))
);

export const unlike = likeable => dispatch => (
    LikeAPIUtil.unlike(likeable)
        .then(
            payload => dispatch(deleteLike(payload)),
            err => dispatch(receiveErrors(err.responseJSON)))
);