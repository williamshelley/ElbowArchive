export const createPost = post => $.ajax({
    url: "/api/posts",
    method: "POST",
    data: { post }
});

export const createPostFromFormData = formData => $.ajax({
    url: "/api/posts",
    method: "POST",
    data: formData,
    contentType: false,
    processData: false
});

export const fetchPosts = userId => $.ajax({
    url: `/api/users/${userId}/posts`,
    method: "GET"
});