import React, {Component} from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import {
    detectGeolocation,
} from './actions'

export const mapStateToProps = state => ({
});

export const mapDispatchToProps = dispatch => ({
    dispatch,
});
const defaultRegion = {latitude: 0, longitude: 0, latitudeDelta: 0.05, longitudeDelta: 0.05};

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {

    state = {
        showStock: false,
        followsUserLocation: true,
        region: {...defaultRegion, ...(this.props.origin || this.props.geolocation)},
    };

    componentDidMount() {
        this.props.dispatch(detectGeolocation())
    }

    notSameLocation(one, two) {
        const RANGE = 5;
        return one && two
            && one.longitude && one.longitude.toFixed(RANGE) !== two.longitude.toFixed(RANGE)
            && one.latitude && one.latitude.toFixed(RANGE) !== two.latitude.toFixed(RANGE)
            || false
    }

    componentDidUpdate(prevProps, prevState) {
        let region = {...defaultRegion, ...this.state.region, ...this.props.geolocation};

        if(this.notSameLocation(this.state.region, this.props.geolocation) && this.state.followsUserLocation) {
            this.setState({region,followsUserLocation: true})
        }
    }

    render() {
        return (
            <MapView {...{
                ...this.props,
                ...this.state,
            }} />
        );
    }
});