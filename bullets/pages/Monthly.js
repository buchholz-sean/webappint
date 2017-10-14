import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Body, Title, Content } from 'native-base';

// Global styles
import styles from '../styles/global';

export default class MonthlyScreen extends React.Component {
    static navigationOptions = {
        title: 'Monthly',
    };
    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Body>
                        <Title>Monthly</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Under Construction</Text>
                </Content>
            </View>
        );
    }
}
