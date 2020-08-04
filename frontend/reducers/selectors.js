export const selectSessionErrors = state => {
    return state.errors.session;
};

export const selectCurrentUser = state => {
    return state.entities.users[state.session.id];
};

export const selectUsers = state => {
    return state.entities.users;
};

export const selectAllPosts = state => {
    return state.entities.posts;
};


export const selectUser = (userId, state) => {
    return state.entities.users[userId];
};

export const selectUserTimelinePosts = (userId, state) => {
    return state.entities.users[userId].timeline_posts;
};

export const selectModals = state => {
    return state.ui.modals;
}
export const selectTopModal = state => {
    return state.ui.modals[state.ui.modals.length - 1];
};
