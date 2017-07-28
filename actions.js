import {
    PERMISSION_DETECTED,
    PERMISSION_UNDETERMINED,
    PERMISSION_ERROR,
} from './constants'

export function permissionDetected(permission, status) {
    return { type: PERMISSION_DETECTED, permission, status }
}

export function permissionUndetermined(permission) {
    return { type: PERMISSION_UNDETERMINED, permission }
}

export function throwPermissionError(error) {
    return { type: PERMISSION_ERROR, error }
}
