import { fromJS } from 'immutable';
import {
    CHANGE_CURRENT_LOCATION,
    GEOLOCATION_DETECTION,
    GEOLOCATION_ERROR,
} from './constants';
import {
    PERMISSION_DETECTED,
} from 'redux-saga-native-permissions/constants';

const initialState = {};

/**
 * Merges location changes into the global application immutable state.
 * @param state
 * @param action
 * @returns {*|any}
 */
export default (state = fromJS(initialState), action = {}) => {
    switch (action.type) {
        case CHANGE_CURRENT_LOCATION:
            return state
                .set(COORDINATES, action.location)
                .set('isPositionRequested', false)
                ;
        case GEOLOCATION_DETECTION:
            return state
                .set('hasGeolocation', true)
                .set('isPositionRequested', true)
                ;
        case GEOLOCATION_ERROR:
            alert(action.error.message);
            return state
                .set('hasGeolocation', false)
                ;
        case PERMISSION_DETECTED:
            return state
                .set('animate', true)
                ;
        default: return state;
    }
};
