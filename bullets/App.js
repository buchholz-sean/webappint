import React from 'react';
import { StyleSheet, Text, View, TextInput, ListView, Button, AlertIOS } from 'react-native';

// Import custom Components
const TitleBar = require('./components/TitleBar');
const ListItem = require('./components/ListItem');
const SubmitButton = require('./components/SubmitButton');

// Configure Firebase
import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyA1_MLFnsq5VECmJnFo1d7JJLl7pMN6DE0",
  authDomain: "bullets-d19a6.firebaseapp.com",
  databaseURL: "https://bullets-d19a6.firebaseio.com",
  storageBucket: "bullets-d19a6.appspot.com",
};
firebase.initializeApp(config);

// Begin App
export default class App extends React.Component {

    constructor(props) {
        super(props);
        // State of data source
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        // Database reference
        this.itemsRef = firebase.database().ref();
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.watchForItems(this.itemsRef);
    }

    _renderItem(item) {
        return(
            <ListItem item={item} onpress={() => {}} />
        );
    }

    _addItem(){
        console.log('Add Entry pressed');
        AlertIOS.prompt(
            'New item',
            null,
            [
                {
                    text: 'Add',
                    onPress: (text) => {
                        this.itemsRef.push({title: text})
                    }
                }
            ],
            'plain-text'
        );
    }

    watchForItems(itemsRef){
        // Listen for changes to database
        itemsRef.on('value', (snapshot) => {
            var items = [];
            // Push each changed item to items array
            snapshot.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });
            this.setState({
                // Update db with items array
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    // Render main app window
    render() {
        return (
            <View style={styles.container}>
                <TitleBar title="Bullets" />
                <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
                <SubmitButton title="Add Entry" onpress={this._addItem.bind(this)} />
            </View>
        );
    }
}

// Default styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
