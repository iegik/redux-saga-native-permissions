# Native Permissions Saga

1. Add saga
```
import sagaNativePermissions from 'redux-saga-native-permissions/sagas'
store.runSaga(sagaNativePermissions);

```

2. Initialize saga

```
import {
    detectGeolocation,
} from './actions'

...

    componentDidMount() {
        this.props.dispatch(detectGeolocation())
    }
```

3. Add custom action

```
import {
    PERMISSION_DETECTED,
} from 'redux-saga-native-permissions/constants';

import {
    throwPermissionError,
} from 'redux-saga-native-permissions/action';

...

dispatch(throwPermissionError(new Error()))
```