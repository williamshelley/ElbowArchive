export const fetchFriendRequests = forUserId => $.ajax({
    url: "/api/friend_requests",
    method: "GET",
    data: { user_id: forUserId }
});

// { user_id, friend_id }
export const sendFriendRequest = friendRequest => $.ajax({
    url: "/api/friend_requests",
    method: "POST",
    data: { friend_request: friendRequest }
});

export const updateFriendRequest = friendRequest => $.ajax({
    url: `/api/friend_requests/${friendRequest.id}`,
    method: "PATCH",
    data: { friend_request: friendRequest }
});

export const fetchFriend = userId => $.ajax({
    url: "/api/friend_requests/",
    method: "GET",
    data: { user_id: userId }
});

export const deleteFriendRequest = friendRequestId => $.ajax({
    url: `/api/friend_requests/${friendRequestId}`,
    method: "DELETE"
});