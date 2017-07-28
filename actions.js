import {
    PERMISSION_DETECTED,
    PERMISSION_UNDETERMINED,
    PERMISSION_ERROR,
    PERMISSION_DENIED,
    PERMISSION_AUTHORIZED,
} from './constants'

export function permissionDetected(permission, status) {
    return { type: PERMISSION_DETECTED, permission, status }
}

export function permissionDenied(permission) {
    return { type: PERMISSION_DENIED, permission }
}

export function permissionAuthorized(permission) {
    return { type: PERMISSION_AUTHORIZED, permission }
}

export function permissionUndetermined(permission) {
    return { type: PERMISSION_UNDETERMINED, permission }
}

export function throwPermissionError(error) {
    return { type: PERMISSION_ERROR, error }
}
