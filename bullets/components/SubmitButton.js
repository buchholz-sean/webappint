'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

class SubmitButton extends React.Component {
    render() {
        return (
            <View>
                <Button full light onPress = {this.props.onpress}>
                    <Text>{this.props.title}</Text>
                </Button>
            </View>
        );
    }
}

module.exports = SubmitButton;
