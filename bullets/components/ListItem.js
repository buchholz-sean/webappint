'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { CardItem, Icon } from 'native-base';

import styles from '../styles/global';

class ListItem extends React.Component {

    renderImage(entryType){
        switch (entryType) {
            case 0:
            case 'Task':
                return <Image source={require('../assets/arrows_check.png')} style={styles.listIcon} />
                break;
            case 1:
            case 'Event':
                return <Image source={require('../assets/basic_bookmark.png')} style={styles.listIcon} />
                break;
            case 2:
            case 'Note':
                return <Image source={require('../assets/basic_book_pen.png')} style={styles.listIcon} />
                break;
            default:
                return <Image source={require('../assets/arrows_check.png')} style={styles.listIcon} />
        }
    }

    render() {
        const contents = this.props.item.entryType == 0 || this.props.item.entryType == 'Task' ? <CardItem button onPress={this.props.onPress}>
            {this.renderImage(this.props.item.entryType)}
            <Text style={styles.listText}>{this.props.item.title}</Text>
        </CardItem> :
        <CardItem>
            {this.renderImage(this.props.item.entryType)}
            <Text style={styles.listText}>{this.props.item.title}</Text>
        </CardItem>
        return (
            <View>
            {contents}
            </View>
        );
    }
}

module.exports = ListItem;
