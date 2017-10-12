'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class ListItem extends React.Component {
    render() {
        return (
            <TouchableHighlight
              onpress={this.props.onpress}>
                <View>
                    <Text>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;
