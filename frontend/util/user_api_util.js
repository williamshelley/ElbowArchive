export const updateUser = user => $.ajax({
    url: `/api/users/${user.id}`,
    method: "PATCH",
    data: { user }
});

export const fetchUser = userId => $.ajax({
    url: `/api/users/${userId}`,
    method: "GET"
});


// { user_id, friend_id }
export const sendFriendRequest = friendRequest => $.ajax({
    url: "/api/friends",
    method: "POST",
    data: { friendRequest }
});

export const updateFriendRequest = friendRequest => $.ajax({
    url: `/api/friends/${friendRequest.id}`,
    method: "PATCH",
    data: { friendRequest }
});