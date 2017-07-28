/*
 * https://github.com/redux-saga/redux-saga
 */
import { call, put, takeLatest } from 'redux-saga/effects'

import {
    GEOLOCATION,
    GEOLOCATION_DETECTION,
} from './constants';
import {
    UNDETERMINED,
    AUTHORIZED,
    PERMISSION_DETECTED,
} from 'redux-saga-native-permissions/constants';

import {
    getCurrentLocation,
    changeCurrentLocation,
    throwLocationPermissionError,
    throwLocationDetectionError,
} from './actions';
import {
    getLocationPermission,
} from 'redux-saga-native-permissions/sagas';

import {
    requestPermission,
} from 'redux-saga-native-permissions/actions';

export function* processGeolocation() {
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

export function* checkGeolocationPermission({permission, status}) {
    if (permission === 'location') {
        if (status === UNDETERMINED) {
            yield put(requestPermission({permission}));
        } else if (status === AUTHORIZED) {
            yield put(getCurrentLocation());
        } else {
            yield put(throwLocationPermissionError(`Permission error: ${status}`));
        }
    }
}

export default function* (){
    yield takeLatest(GEOLOCATION_DETECTION, processGeolocation);
    yield takeLatest(PERMISSION_DETECTED, checkGeolocationPermission);
    yield takeLatest(GEOLOCATION, getLocationPermission);
}