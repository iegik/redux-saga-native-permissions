/*
 * https://github.com/redux-saga/redux-saga
 */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Permissions from 'react-native-permissions';

import {
    PERMISSION_ERROR,
} from './constants';

import {
    permissionDetected,
    throwPermissionError,
} from './actions';

export function* getLocationPermission(){
    try {
        let response = yield call(() => Permissions.check('location', 'whenInUse'));
        yield put(permissionDetected('location', response))
    } catch (error) {
        yield put(throwPermissionError(error));
    }
}

export function* getCameraPermission(){
    try {
        let response = yield call(() => Permissions.check('camera', 'whenInUse'));
        yield put(permissionDetected('camera', response))
    } catch (error) {
        yield put(throwPermissionError(error));
    }
}

export function* checkLocationPermission(state){
}

export function* openSettings(){
    try {
        let response = yield call(() => Permissions.canOpenSettings && Permissions.canOpenSettings() && Permissions.openSettings && Permissions.openSettings());
    } catch (error) {
        // console.log(error)
        // alert('Open settings!')
    }
}

export default function* (){
    yield takeLatest(PERMISSION_ERROR, openSettings);
}