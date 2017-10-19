'use strict';

import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
    ListItem,
    Body,
    Button,
    Icon,
    Left,
    Right,
    Text,
    Separator,
    View
} from 'native-base';

import colors from '../styles/variables';

class ListEntry extends React.Component {

    renderImage(entryType) {
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
        const contents = this.props.item.entryType == 3 || this.props.item.entryType == 'Header'
        // If Header item, render Separator...
            ? <Separator style={styles.listSeparator}>
                    <Text style={styles.listSeparatorText}>{this.props.item.title}</Text>
                </Separator>
            :
            // ...otherwise, if Task item, render as touchable Task...
            (this.props.item.entryType == 0 || this.props.item.entryType == 'Task'
                ? <ListItem icon button onPress={this.props.onPress} style={styles.listEntry}>
                        <Left>{this.renderImage(this.props.item.entryType)}</Left>
                        <Body>
                            <Text style={styles.listText}>{this.props.item.title}</Text>
                        </Body>
                    </ListItem>
                // ...otherwise, render as Note/Event
                : <ListItem icon style={styles.listEntry}>
                    <Left>{this.renderImage(this.props.item.entryType)}</Left>
                    <Body>
                        <Text style={styles.listText}>{this.props.item.title}</Text>
                    </Body>
                    <Right>
                        <Button iconRight transparent dark onPress={this.props.onPress} style={styles.removeIcon}>
                            <Icon name='ios-close'/>
                        </Button>
                    </Right>
                </ListItem>);
        return (
            <View>
                {contents}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    listIcon: {
        width: 26,
        height: 26
    },
    listSeparator: {
        backgroundColor: colors.dividerColor,
    },
    listSeparatorText: {
        color: colors.backgroundColor,
        fontSize: 16
    },
    listText: {
        fontSize: 16
    }
});

module.exports = ListEntry;
