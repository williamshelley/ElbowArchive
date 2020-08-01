// export const PROFILE_PATH = (user, id, ...path) => {
    // return `/profile/${user.id}/`;
    // if (user) {
    //     let { first_name, last_name } = user;
    //     let p = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
    //     let userId = id ? `${id}/` : "";
    //     return `${p}/${userId}${path.join("/")}`;
    // } else {
    //     return "/profile";
    // }
// }

export const PROFILE_PATH = (next) => {
    // return `/profile/${userId}/${next ? next : ""}`;
    return `/profile/:userId/${next ? next : ""}`;
}