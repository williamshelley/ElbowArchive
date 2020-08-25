import * as PostAPIUtil from "../util/post_api_util";

export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const MERGE_POSTS = "MERGE_POSTS";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS"
export const CLEAR_POST_ERRORS = "CLEAR_POST_ERRORS";
export const RECEIVE_POST_ERROR = "RECEIVE_POST_ERROR";
export const REMOVE_POST_ERROR = "REMOVE_POST_ERROR";

export const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const mergePosts = posts => ({
    type: MERGE_POSTS,
    posts
});

export const receiveErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
});

export const clearPostErrors = () => ({
    type: RECEIVE_POST_ERROR
});

export const receivePostError = (field, error) => ({
    type: RECEIVE_POST_ERROR,
    field,
    error
});

export const removePostError = (field) => ({
    type: REMOVE_POST_ERROR,
    field
});


export const createPost = post => dispatch => (
    PostAPIUtil.createPost(post)
        .then(
            payload => dispatch(receivePost(payload),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
        )
);


export const createPostFromFormData = formData => dispatch => (
    PostAPIUtil.createPostFromFormData(formData)
        .then(
            payload => dispatch(receivePost(payload),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
        )
);

export const fetchPosts = (userId) => dispatch => (
    PostAPIUtil.fetchPosts(userId)
        .then(
            payload => dispatch(receivePosts(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON))
        )
);

export const fetchPagePosts = (filters) => dispatch => {
    return (
    PostAPIUtil.fetchPagePosts(filters)
    .then(
        payload => dispatch(receivePosts(payload)),
        errorPayload => dispatch(receiveErrors(errorPayload.responseJSON))
    )
);
    }
export const fetchAndMergePosts = (filters) => dispatch => (
    PostAPIUtil.fetchPagePosts(filters)
        .then(
            payload => dispatch(mergePosts(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON))
        )
);

export const fetchPost = postId => dispatch => (
    PostAPIUtil.fetchPost(postId)
        .then(
            payload => dispatch(receivePost(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON))
        )
);