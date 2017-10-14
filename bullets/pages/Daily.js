import React from 'react';
import { StyleSheet, View, TextInput, Text, ListView, AlertIOS, FlatList } from 'react-native';
import { Header, Body, Title, Content, Footer, Icon, List, Card, ActionSheet } from 'native-base';

// Import momentJS for pretty Date/Time objects
import moment from 'moment';

// Import custom Components
const ListItem = require('../components/ListItem');
const SubmitButton = require('../components/SubmitButton');

// Global styles
import styles from '../styles/global';

import firebaseApp from '../firebaseConfig';

export default class DailyScreen extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Daily Log',
        tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-calendar-outline' style={[styles.tabIcon, {color: tintColor}]} />
        ),
    };

    constructor(props) {
        super(props);
        // State of data source
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            items: []
        };
        // Database reference
        this.itemsRef = firebaseApp.database().ref();
    }

    componentDidMount(){
        this.watchForItems(this.itemsRef);
    }

    _renderItem(item) {
        const onPress = () => {
            AlertIOS.prompt(
                'Clear Item',
                null,
                [
                    {
                        text: 'Remove',
                        onPress: (text) => this.itemsRef.child(item._key).remove()
                    },
                    {
                        text: 'Cancel',
                        onPress: (text) => console.log('Canceled')
                    }
                ],
                'default'
            )}
        return(
            <ListItem item={item} onPress={onPress} />
        );
    }

    _addItem(){
        console.log('Add Entry pressed');
        var BUTTONS = ['Task', 'Event', 'Note', 'Cancel'];
        var CANCELINDEX = 3;
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCELINDEX,
                title: 'Entry Type'
            },
            buttonIndex => {
                AlertIOS.prompt(
                    'New item',
                    null,
                    [
                        {
                            text: 'Add',
                            onPress: (text) => {
                                this.itemsRef.push({
                                    title: text,
                                    date: moment().format('MMDDYY'),
                                    completed: false,
                                    entryType: BUTTONS[buttonIndex]
                                })
                            }
                        }
                    ],
                    'plain-text'
                );
            }
        );
    }

    watchForItems(itemsRef){
        // Listen for changes to database
        itemsRef.on('value', (snapshot) => {
            var items = [];
            // Push each item to items array
            snapshot.forEach((child) => {
                items.push({
                    title: child.val().title,
                    date: child.val().date,
                    entryType: child.val().entryType,
                    _key: child.key
                });
            });
            this.setState({
                // Update db with items array
                dataSource: this.state.dataSource.cloneWithRows(items),
                items: items
            });
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Body>
                        <Title>Daily</Title>
                    </Body>
                </Header>
                <Content>
                    <Card dataArray={this.state.items} renderRow={(item) => this._renderItem(item)} style={styles.cardList}></Card>
                </Content>
                <Footer>
                    <SubmitButton title='Add Entry' onpress={this._addItem.bind(this)} />
                </Footer>
            </View>
        )
    }
}
