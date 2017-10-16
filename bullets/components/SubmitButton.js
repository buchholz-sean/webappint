'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text, Icon} from 'native-base';

import styles from '../styles/global';

class SubmitButton extends React.Component {
    render() {
        return (
            <Button full iconRight onPress={this.props.onpress} style={styles.submitButton}>
                <Text>{this.props.title}</Text>
                <Icon name='ios-create-outline'/>
            </Button>
        );
    }
}

module.exports = SubmitButton;
