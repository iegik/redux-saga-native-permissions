import {
    GEOLOCATION,
    GEOLOCATION_ERROR,
    CHANGE_CURRENT_LOCATION,
} from './constants'

export function detectGeolocation() {
    return { type: GEOLOCATION }
}

export function changeCurrentLocation(location) {
    return { type: CHANGE_CURRENT_LOCATION, location }
}

export function throwLocationPermissionError(error) {
    return { type: GEOLOCATION_ERROR, error }
}

export function throwLocationDetectionError(error) {
    return { type: GEOLOCATION_ERROR, error }
}
