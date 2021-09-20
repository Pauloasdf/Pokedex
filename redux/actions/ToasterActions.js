import * as Types from '../types';

export const PushToaster = (toasterType, toasterMessage) => ({
    type: Types.PUSH_TOASTER,
    payload: {
        type: toasterType,
        message: toasterMessage
    }
})

export const PopToaster = () => ({
    type: Types.POP_TOASTER
})