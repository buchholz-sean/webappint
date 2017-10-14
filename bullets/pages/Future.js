import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Body, Title, Content } from 'native-base';

// Global styles
import styles from '../styles/global';

export default class Future extends React.Component {
    static navigationOptions = {
        title: 'Future',
    };
    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Body>
                        <Title>Future</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Under Construction</Text>
                </Content>
            </View>
        );
    }
}
