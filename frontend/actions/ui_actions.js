export const PUSH_MODAL = "PUSH_MODAL";
export const POP_MODAL = "POP_MODAL";

export const pushModal = modal => ({
    type: PUSH_MODAL,
    modal
});

export const popModal = () => ({
    type: POP_MODAL
});