export const safePush = (history, destination) => {
    if (history.location.pathname !== destination) {
        history.push(destination);
    }
}