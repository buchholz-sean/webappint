'use strict';

import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {ListItem, Icon, Left, Text} from 'native-base';

import styles from '../styles/global';

class ListEntry extends React.Component {

    _renderImage(entryType) {
        // Render correct entry icon for corresponding entry types
        switch (entryType) {
                // Cases provided with index and name of entry types (just in case)
            case 0:
            case 'Task':
                // TODO: Render Complete vs. Incomplete tasks with visual feedback/different icon?
                return <Image source={require('../assets/arrows_check.png')} style={styles.listIcon}/>;
                break;
            case 1:
            case 'Event':
                return <Image source={require('../assets/basic_bookmark.png')} style={styles.listIcon}/>
                break;
            case 2:
            case 'Note':
                return <Image source={require('../assets/basic_book_pen.png')} style={styles.listIcon}/>
                break;
            default:
                return <Image source={require('../assets/basic_elaboration_calendar_empty.png')} style={styles.listIcon}/>
        }
    }

    render() {
        const contents = this.props.item.entryType == 0 || this.props.item.entryType == 'Task'
            ? <ListItem icon button onPress={this.props.onPress} style={styles.listEntry}>
                    <Left>{this._renderImage(this.props.item.entryType)}</Left>
                    <Text style={styles.listText}>{this.props.item.title}</Text>
                </ListItem>
            : (this.props.item.entryType == 3 || this.props.item.entryType == 'Header'
                ? <ListItem itemDivider>
                        <Left>{this._renderImage(this.props.item.entryType)}</Left>
                        <Text>{this.props.item.title}</Text>
                    </ListItem>
                : <ListItem icon style={styles.listEntry}>
                    <Left>{this._renderImage(this.props.item.entryType)}</Left>
                    <Text style={styles.listText}>{this.props.item.title}</Text>
                </ListItem>);
        return (
            <View>
                {contents}
            </View>
        );
    }
}

module.exports = ListEntry;
