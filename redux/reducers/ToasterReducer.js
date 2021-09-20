import * as Types from '../types';
const initialState = {
    open: false,
    type: "",
    duration: 6000,
    message: ""
};
const ToasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.PUSH_TOASTER:
            return {
                ...state,
                open: true,
                type: action.payload.type,
                message: action.payload.message
            }
        case Types.POP_TOASTER:
            return { ...initialState }
        default:
            return { ...state };
    }
};

export default ToasterReducer;