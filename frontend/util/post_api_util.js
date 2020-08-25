export const createPost = post => $.ajax({
    url: "/api/posts",
    method: "POST",
    data: { post }
});

export const fetchPost = postId => $.ajax({
    url: `/api/posts/${postId}`,
    method: "GET",
    data: { post_id: postId }
})

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

export const fetchPagePosts = ({ userId, page, newsfeed }) => {
    return ($.ajax({
        url: `/api/users/${userId}/posts`,
        method: "GET",
        data: { page, newsfeed }
    }));
}