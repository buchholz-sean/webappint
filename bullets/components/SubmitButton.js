'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class SubmitButton extends React.Component {
    render() {
        return (
            <View>
                <TouchableHighlight
                  onpress = {this.props.onpress}>
                    <Text>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = SubmitButton;
