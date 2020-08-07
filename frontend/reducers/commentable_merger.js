import { merge } from "lodash";

const commentableMerger = (state = {}, comment) => {
    Object.freeze(state);

    let commentable = merge({}, state[comment.commentable_id]);
    let newCommentable = merge({}, commentable, { comments: { [comment.id]: comment }});
    let newId = newCommentable.id;

    return merge({}, state, { [newId]: newCommentable });
}

export default commentableMerger;