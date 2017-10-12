'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class ListItem extends React.Component {
    render() {
        return (
            <TouchableHighlight
              onPress={this.props.onPress}>
                    <Text>{this.props.item.title}</Text>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;
