import * as CommentApiUtil from "../util/comment_api_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";

export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const deleteCommentAction = commentId => ({
    type: DELETE_COMMENT,
    commentId
});

export const receiveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const createComment = comment => dispatch => (
    CommentApiUtil.createComment(comment)
        .then(
            payload => dispatch(receiveComment(payload)),
            err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteComment = commentId => dispatch => (
    CommentApiUtil.deleteComment(commentId)
        .then(
            payload => dispatch(deleteCommentAction(payload)),
            err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateComment = comment => dispatch => (
    CommentApiUtil.updateComment(comment)
        .then(
            payload => dispatch(receiveComment(payload)),
            err => dispatch(receiveErrors(err.responseJSON)))
);