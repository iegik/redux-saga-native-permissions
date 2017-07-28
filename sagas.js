/*
 * https://github.com/redux-saga/redux-saga
 */
import { call, put, takeLatest } from 'redux-saga/effects'
import Permissions from 'react-native-permissions';

import {
    UNDETERMINED,
    AUTHORIZED,
    DENIED,

    PERMISSION_TYPE_CAMERA,
    PERMISSION_TYPE_LOCATION,
    
    PERMISSION_DETECTED,
    PERMISSION_UNDETERMINED,
    PERMISSION_DENIED,
    PERMISSION_ERROR,
} from './constants';

import {
    permissionDetected,
    permissionUndetermined,
    permissionDenied,
    permissionAuthorized,
    throwPermissionError,
} from './actions';

export function* getLocationPermission(){
    try {
        let response = yield call(() => Permissions.check(PERMISSION_TYPE_LOCATION, 'whenInUse'));
        yield put(permissionDetected(PERMISSION_TYPE_LOCATION, response))
    } catch (error) {
        yield put(permissionUndetermined(PERMISSION_TYPE_LOCATION, error));
    }
}

export function* requestPermission({permission}){
    try {
        let response = yield call(() => Permissions.request(permission, 'whenInUse'));
        yield put(permissionDetected(permission, response))
    } catch (error) {
        yield put(throwPermissionError(error));
    }
}

export function* checkPermission({permission, status}){
    if (status === UNDETERMINED) {
        yield put(permissionUndetermined(permission));
    }
    if (status === AUTHORIZED) {
        yield put(permissionAuthorized(permission));
    }
    if (status === DENIED) {
        yield put(permissionDenied(permission));
    }
}

export function* getCameraPermission(){
    try {
        let response = yield call(() => Permissions.check(PERMISSION_TYPE_CAMERA, 'whenInUse'));
        yield put(permissionDetected(PERMISSION_TYPE_CAMERA, response))
    } catch (error) {
        yield put(permissionUndetermined(PERMISSION_TYPE_CAMERA, error));
    }
}

export function* openSettings(){
    try {
        let response = yield call(() => {
            return Permissions.canOpenSettings && Permissions.canOpenSettings()
                && Permissions.openSettings && Permissions.openSettings()
        });
    } catch (error) {
        console.log(error)
        // alert('Open settings!')
    }
}

export default function* (){
    yield takeLatest(PERMISSION_ERROR, openSettings);
    yield takeLatest(PERMISSION_DENIED, openSettings);
    yield takeLatest(PERMISSION_UNDETERMINED, requestPermission);
    yield takeLatest(PERMISSION_DETECTED, checkPermission);
}