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

export default function* (){
    yield takeLatest(PERMISSION_DETECTED, processGeolocation);
    yield takeLatest(GEOLOCATION, getLocationPermission);
}