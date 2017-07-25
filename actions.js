import {
    PERMISSION_DETECTED,
    PERMISSION_ERROR,
} from './constants'

export function locationPermissionDetected(permission, status) {
    return { type: PERMISSION_DETECTED, permission, status }
}

export function throwPermissionError(error) {
    return { type: PERMISSION_ERROR, error }
}
