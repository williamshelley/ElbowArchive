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

export const selectTopModal = state => {
    return state.ui[state.ui.length - 1];
};

export const selectUser = (userId, state) => {
    return state.entities.users[userId];
};