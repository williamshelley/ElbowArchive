export const createPost = post => $.ajax({
    url: "/api/posts",
    method: "POST",
    data: { post }
});

export const fetchPosts = () => $.ajax({
    url: "/api/posts",
    method: "GET"
});