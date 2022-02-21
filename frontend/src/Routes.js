import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
import DataScreen from './screens/DataScreen';
import StatusScreen from './screens/StatusScreen';
import PredictScreen from './screens/PredictScreen'

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/upload" component={UploadScreen} />
            <Route exact path="/data" component={DataScreen} />
            <Route exact path="/status" component={StatusScreen} />
            <Route exact path="/predict" component={PredictScreen} />
        </Switch>
    )
}

export default Routes;