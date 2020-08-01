export const createPost = post => $.ajax({
    url: "/api/posts",
    method: "POST",
    data: { post }
});

export const fetchPosts = userId => $.ajax({
    url: `/api/users/${userId}/posts`,
    method: "GET"
});