export const addTextResizableListener = (id, maxCharsPerRow, noResize) => {
    $(document).ready(() => {
        const textarea = $(`textarea#resizable-${id}`);
        const handler = () => {
            const numChars = textarea.val().length;
            let newNumRows = Math.ceil(numChars / maxCharsPerRow);
            if (!noResize) {
                if (numChars > maxCharsPerRow / 3) {
                    textarea.css("font-size", "16px");
                } else {
                    textarea.css("font-size", "24px");
                }
            }
            textarea.attr("rows", newNumRows);
        };
        textarea.on("keypress", handler);
        textarea.on("keyup", handler);
        textarea.on("keydown", handler);
    });
}