import * as actions from "../action-types"
export const setIP = (ip) => {
    return {
        type: actions.SET_IP,
        payload: ip
    }
}