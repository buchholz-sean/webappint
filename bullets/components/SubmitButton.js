'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

class SubmitButton extends React.Component {
    render() {
        return (
            <View>
                <Button onPress = {this.props.onpress}
                  title = {this.props.title} />
            </View>
        );
    }
}

module.exports = SubmitButton;
