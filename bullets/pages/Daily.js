import React from 'react';
import {StyleSheet, AlertIOS, Image} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    List,
    ActionSheet,
    Text,
    View
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
        // TODO: Change format of moment date to YYYYMMDD to allow for correct sorting over years
        super(props);
        this.state = {
            data: [],
            today: moment().format('MMDDYY')
        };
        // Database reference
        this.itemsRef = firebaseApp.database().ref();
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    renderItem(item) {
        const onPress = () => {
            // IOS prompt to mark Task entries complete or remove Note/Event entries
            var msg = item.entryType == 'Task'
                ? 'Mark Task Complete?'
                : 'Remove ' + item.entryType + '?';
            var buttonText = item.entryType == 'Task'
                ? 'Complete'
                : 'Remove';
            AlertIOS.prompt(msg, null, [
                {
                    text: buttonText,
                    // TODO: Provide visual feedback (strikethru) on complete items instead of remove
                    onPress: (text) => this.itemsRef.child(item._key).remove()
                }, {
                    text: 'Cancel',
                    onPress: (text) => console.log('Canceled')
                }
            ], 'default')
        }
        return (<ListEntry item={item} onPress={onPress}/>);
    }

    addItem() {
        // Configuration for ActionSheet
        const BUTTONS = ['Task', 'Event', 'Note', 'Cancel'];
        const CANCELINDEX = 3;
        ActionSheet.show({
            options: BUTTONS,
            cancelButtonIndex: CANCELINDEX,
            title: 'Entry Type'
        }, buttonIndex => {
            // If user selects option other than Cancel
            if (buttonIndex != CANCELINDEX) {
                // TODO: Multiline input prompt (with 'react-native-prompt'?)
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

    migrateTask(item) {
        // Only auto-migrate Task entries--not Notes or Events
        if (item.entryType == 'Task' && !item.completed) {
            // Update item date to today's date
            item.date = this.state.today;
            this.itemsRef.child(item._key).update({date: item.date});
        }
    }

    listenForItems(itemsRef) {
        var uniqueDates = new Set();
        // Listen for changes to database
        itemsRef.on('value', (snapshot) => {
            var items = [];
            var data = [];
            // Push each item to front of items array
            snapshot.forEach((child) => {
                items.unshift({title: child.val().title, date: child.val().date, entryType: child.val().entryType, completed: child.val().completed, _key: child.key});
            });
            // If any incomplete tasks left over from previous days, auto-migrate to today...
            for (var i = 0; i < items.length; i++) {
                this.migrateTask(items[i]);
                // ...then add each unique date to Set
                uniqueDates.add(items[i].date);
            };
            // Put unique dates into array to sort
            // ES6 Set is an unordered collection of Objects and can't be sorted
            // This workaround ensures date headers display in the correct order
            var sortedDates = [];
            for (let date of uniqueDates) {
                sortedDates.push(date);
            }
            sortedDates.sort();
            // Loop through sorted array of unique dates
            for (var i = 0; i < sortedDates.length; i++) {
                // Add each unique date as item to front of data array...
                data.unshift({
                    title: moment(sortedDates[i], 'MMDDYY').calendar(null, {
                        lastDay: '[Yesterday]',
                        sameDay: '[Today]',
                        lastWeek: '[Last] dddd',
                        sameElse: 'L'
                    }),
                    entryType: 'Header'
                })
                // ...then add items matching that unique date by splicing in behind the date header
                for (var item in items) {
                    if (items.hasOwnProperty(item)) {
                        if (items[item].date == sortedDates[i]) {
                            data.splice(1, 0, items[item]);
                        };
                    };
                };
            };
            // Update data in Component state for List Component to render
            this.setState({data: data});
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Daily Log</Title>
                    </Body>
                </Header>
                <Content>
                    <List dataArray={this.state.data} renderRow={(item) => this.renderItem(item)}/>
                </Content>
                <SubmitButton title='Add Entry' onPress={this.addItem.bind(this)}/>
            </Container>
        )
    }
}
