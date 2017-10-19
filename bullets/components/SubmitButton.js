'use strict';

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, Icon} from 'native-base';

import colors from '../styles/variables';

class SubmitButton extends React.Component {
    render() {
        return (
            <Button full iconRight onPress={this.props.onPress} style={styles.submitButton}>
                <Text>{this.props.title}</Text>
                <Icon name='ios-create-outline'/>
            </Button>
        );
    }
}

var styles = StyleSheet.create({
    submitButton: {
        backgroundColor: colors.buttonColor
    },
});

module.exports = SubmitButton;
