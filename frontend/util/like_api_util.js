// list: [{ likeableType, likeableId }]
// export const fetchLikes = filters => $.ajax({
//     url: "/api/likes",
//     method: "GET",
//     data: { filters }
// });

export const like = likeable => $.ajax({
    url: "/api/likes",
    method: "POST",
    data: { likeable }
});

export const unlike = likeId => $.ajax({
    url: `/api/likes/${likeId}`,
    method: "DELETE"
});