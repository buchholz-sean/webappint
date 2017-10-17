import React from 'react';
import {StyleSheet, View, AlertIOS, Image} from 'react-native';
import {
    Header,
    Body,
    Title,
    Content,
    List,
    ActionSheet,
    Text
} from 'native-base';

// Import momentJS for pretty Date/Time objects
import moment from 'moment';

// Import custom Components
const ListEntry = require('../components/ListEntry');
const SubmitButton = require('../components/SubmitButton');

// Global styles
import styles from '../styles/global';

import firebaseApp from '../firebaseConfig';

export default class DailyScreen extends React.Component {

    // Options for Tab Navigation
    static navigationOptions = {
        tabBarLabel: 'Daily Log',
        tabBarIcon: ({tintColor}) => (<Image source={require('../assets/basic_spread_text_bookmark.png')} style={[
            styles.tabIcon, {
                tintColor: tintColor
            }
        ]}/>)
    };

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        // Database reference
        this.itemsRef = firebaseApp.database().ref();
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    _renderItem(item) {
        const onPress = () => {
            // IOS prompt to mark Task entries complete (remove from list)
            // TODO: Provide 'Remove' functionality for Notes/Events
            // TODO: Provide visual feedback on complete items instead of remove
            AlertIOS.prompt('Mark Item Complete?', null, [
                {
                    text: 'Complete',
                    onPress: (text) => this.itemsRef.child(item._key).remove()
                }, {
                    text: 'Cancel',
                    onPress: (text) => console.log('Canceled')
                }
            ], 'default')
        }
        return (<ListEntry item={item} onPress={onPress}/>);
    }

    _addItem() {
        // Configuration for ActionSheet
        var BUTTONS = ['Task', 'Event', 'Note', 'Cancel'];
        var CANCELINDEX = 3;
        ActionSheet.show({
            options: BUTTONS,
            cancelButtonIndex: CANCELINDEX,
            title: 'Entry Type'
        }, buttonIndex => {
            // If user selects option other than Cancel
            if (buttonIndex != CANCELINDEX) {
                // IOS prompt to add new entry of selected type
                AlertIOS.prompt('New ' + BUTTONS[buttonIndex], null, [
                    {
                        text: 'Add',
                        onPress: (text) => {
                            // If prompt text input is not blank
                            if (text.trim() != '') {
                                // Push item to front database
                                this.itemsRef.push({title: text, date: moment().format('MMDDYY'), completed: false, entryType: BUTTONS[buttonIndex]})
                            }
                        }
                    }, {
                        text: 'Cancel',
                        onPress: (text) => console.log('Canceled')
                    }
                ], 'plain-text');
            }
        });
    }

    listenForItems(itemsRef) {
        var uniqueDates = new Set();
        // Listen for changes to database
        itemsRef.on('value', (snapshot) => {
            var items = [];
            var data = [];
            // Push each item to front of items array
            snapshot.forEach((child) => {
                items.unshift({title: child.val().title, date: child.val().date, entryType: child.val().entryType, _key: child.key});
                // Add each unique date to Set
                uniqueDates.add(child.val().date);
            });
            // Loop through unique dates
            for (let date of uniqueDates) {
                // Add each unique date as item to front of data array...
                data.unshift({
                    title: moment(date, 'MMDDYY').calendar(null, {
                        lastDay: '[Yesterday]',
                        sameDay: '[Today]',
                        lastWeek: '[Last] dddd',
                        sameElse: 'L'
                    }),
                    entryType: 'Header'
                })
                // ...then add items matching that unique date
                // by splicing in behind the date header
                for (var item in items) {
                    if (items.hasOwnProperty(item)) {
                        if (items[item].date == date) {
                            data.splice(1, 0, items[item]);
                        };
                    };
                };
            };
            // Update data in Component state for List Component to render
            this.setState({
                data: data
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Body>
                        <Title>Daily Log</Title>
                    </Body>
                </Header>
                <Content>
                    <List dataArray={this.state.data} renderRow={(item) => this._renderItem(item)}/>
                </Content>
                <SubmitButton title='Add Entry' onpress={this._addItem.bind(this)}/>
            </View>
        )
    }
}
