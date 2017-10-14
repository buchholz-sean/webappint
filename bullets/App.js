import React from 'react';
import { StyleSheet } from 'react-native';
import { Root } from 'native-base';
import { TabNavigator } from 'react-navigation';

// Import screens for navigation
import DailyScreen from './pages/Daily';
import MonthlyScreen from './pages/Monthly';
import FutureScreen from './pages/Future';

// Global styles
import styles from './styles/global';

const Screens = TabNavigator({
    Daily: {screen: DailyScreen},
    Monthly: {screen: MonthlyScreen},
    Future: {screen: FutureScreen}
    }, {
    tabBarOptions: {
        activeTintColor: '#3b5998',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: '#fff',
        },
    }
});

// Begin App
export default class App extends React.Component {

    // Render main app window
    render() {
        return (
            <Root>
                <Screens />
            </Root>
        );
    }
}
