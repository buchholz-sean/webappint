import React from 'react';
import {Root} from 'native-base';
import {TabNavigator} from 'react-navigation';

// Import screens for navigation
import DailyScreen from './pages/Daily';
import MonthlyScreen from './pages/Monthly';
import FutureScreen from './pages/Future';

const Screens = TabNavigator({
    Daily: {
        screen: DailyScreen
    },
    Monthly: {
        screen: MonthlyScreen
    },
    Future: {
        screen: FutureScreen
    }
}, {
    tabBarOptions: {
        activeTintColor: '#3b5998',
        labelStyle: {
            fontSize: 12
        },
        style: {
            backgroundColor: '#fff'
        }
    }
});

// Begin App
export default class App extends React.Component {

    // Render main app window
    render() {
        return (
            <Root>
                <Screens/>
            </Root>
        );
    }
}
