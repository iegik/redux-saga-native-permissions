/*
 * https://github.com/redux-saga/redux-saga
 */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Permissions from 'react-native-permissions';

import {
    PERMISSION_ERROR,
} from './constants';

import {
    locationPermissionDetected,
    throwPermissionError,
} from './actions';

export function* getLocationPermission(){
    try {
        let response = yield call(() => Permissions.getPermissionStatus('location', 'whenInUse'));
        yield put(locationPermissionDetected('location', response))
    } catch (error) {
        yield put(throwPermissionError(error));
    }
}

export function* checkLocationPermission(state){
}

export function* openSettings(){
    try {
        let response = yield call(() => Permissions.canOpenSettings() && Permissions.openSettings());
    } catch (error) {
        console.log(error)
    }
}

export default function* (){
    yield takeLatest(PERMISSION_ERROR, openSettings);
}