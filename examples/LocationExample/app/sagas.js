/*
 * https://github.com/redux-saga/redux-saga
 */
import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GEOLOCATION,
} from './constants';
import {
    PERMISSION_AUTHORIZED,
    PERMISSION_ERROR,
    PERMISSION_DENIED,
} from 'redux-saga-native-permissions/constants';
import {
    getLocationPermission,
} from 'redux-saga-native-permissions/sagas';

import {
    changeCurrentLocation,
    throwLocationDetectionError,
    throwLocationPermissionError,
} from './actions';

export function* processGeolocation({permission}) {
    if (permission !== 'location') return;
    try {
        let position = yield call(() => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject,{
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 1000
        })));
        if (!(position && position.coords)) {
            yield put(throwLocationDetectionError());
        }
        yield put(changeCurrentLocation(position.coords));
    } catch (e) {
        yield put(throwLocationDetectionError(e));
    }
}
export function* processPermissionError({permission, error}) {
    if (permission !== 'location') return;
    yield put(throwLocationPermissionError(error));
}

export default function* (){
    yield takeLatest(PERMISSION_AUTHORIZED, processGeolocation);
    yield takeLatest(PERMISSION_DENIED, processPermissionError);
    yield takeLatest(PERMISSION_ERROR, processPermissionError);
    yield takeLatest(GEOLOCATION, getLocationPermission);
}