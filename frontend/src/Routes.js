import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import UploadScreen from './screens/UploadScreen';
import DataScreen from './screens/DataScreen';
import StatusScreen from './screens/StatusScreen';
import PredictScreen from './screens/PredictScreen';
import StaticsScreen from './screens/StaticsScreen';
import SettingsScreen from './screens/SettingsScreen';
import RegistrySettingsScreen from './screens/RegistrySettingsScreen';
import BlockMenu from './components/BlockMenu';

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/upload" component={UploadScreen} />
            <Route exact path="/data" component={DataScreen} />
            <Route exact path="/status" component={StatusScreen} />
            <Route exact path="/predict" component={PredictScreen} />
            <Route exact path="/statics" component={StaticsScreen} />
            <Route exact path="/settings" component={SettingsScreen} />
            <Route exact path="/registry-settings" component={RegistrySettingsScreen} />
            <Route exact path="/block-menu" component={BlockMenu} />
        </Switch>
    )
}

export default Routes;