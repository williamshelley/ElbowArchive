import { merge } from "lodash";

const likeableMerger = (state = {}, like) => {
    Object.freeze(state);

    let likeable = merge({}, state[like.likeable_id]);
    let newLikeable = merge({}, likeable, { likes: { [like.user_id]: like }});
    let newId = newLikeable.id;

    return merge({}, state, { [newId]: newLikeable });
}

export default likeableMerger;