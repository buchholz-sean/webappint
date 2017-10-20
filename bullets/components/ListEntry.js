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

    renderEntry(entryType) {
        // Render Tasks, Events/Notes, and Separators with corresponding props, buttons, and images
        switch (entryType) {
            case 0:
            case 'Task':
                var completionStatus = this.props.item.completed;
                var taskText = completionStatus
                    ? <Text style={styles.listText,
                        styles.listTextComplete}>{this.props.item.title}</Text>
                    : <Text style={styles.listText}>{this.props.item.title}</Text>;
                return <ListItem icon style={styles.listEntry}>
                    <Left>
                        <Button transparent dark onPress={this.props.toggleComplete}>
                            <Image source={require('../assets/arrows_check.png')} style={styles.listIcon}/>
                        </Button>
                    </Left>
                    <Body>
                        {taskText}
                    </Body>
                    <Right>
                        <Button transparent dark style={styles.removeIcon} onPress={this.props.clearItem}>
                            <Icon name='ios-close'/>
                        </Button>
                    </Right>
                </ListItem>;
                break;
            case 1:
            case 'Event':
                return <ListItem icon style={styles.listEntry}>
                    <Left><Image source={require('../assets/basic_bookmark.png')} style={styles.listIcon}/></Left>
                    <Body>
                        <Text style={styles.listText}>{this.props.item.title}</Text>
                    </Body>
                    <Right>
                        <Button iconRight transparent dark onPress={this.props.clearItem} style={styles.removeIcon}>
                            <Icon name='ios-close'/>
                        </Button>
                    </Right>
                </ListItem>;
                break;
            case 2:
            case 'Note':
                return <ListItem icon style={styles.listEntry}>
                    <Left><Image source={require('../assets/basic_book_pen.png')} style={styles.listIcon}/></Left>
                    <Body>
                        <Text style={styles.listText}>{this.props.item.title}</Text>
                    </Body>
                    <Right>
                        <Button iconRight transparent dark onPress={this.props.clearItem} style={styles.removeIcon}>
                            <Icon name='ios-close'/>
                        </Button>
                    </Right>
                </ListItem>;
                break;
            default:
                return <Separator style={styles.listSeparator}>
                    <Text style={styles.listSeparatorText}>{this.props.item.title}</Text>
                </Separator>;
        }
    }

    render() {
        const contents = this.renderEntry(this.props.item.entryType);

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
        backgroundColor: colors.dividerColor
    },
    listSeparatorText: {
        color: colors.backgroundColor,
        fontSize: 16
    },
    listText: {
        fontSize: 16
    },
    listTextComplete: {
        textDecorationLine: 'line-through'
    }
});

module.exports = ListEntry;
