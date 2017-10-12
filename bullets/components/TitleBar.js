'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';

class TitleBar extends React.Component {
    // TODO: Provide basic custom styles to avoid bumping top of window
    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
            </View>
        );
    }
}

module.exports = TitleBar;
