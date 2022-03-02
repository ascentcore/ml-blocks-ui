import * as actions from '../action-types';

const intialState = '';
export const ipReducer = (state = intialState, action) => {
    switch (action.type) {
        case actions.SET_IP:
            return state;
        default:
            return state;
    }
}