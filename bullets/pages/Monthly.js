import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Header, Body, Title, Content} from 'native-base';

// Global styles
import styles from '../styles/global';

export default class MonthlyScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Monthly Log',
        tabBarIcon: ({tintColor}) => (<Image source={require('../assets/basic_elaboration_calendar_empty.png')} style={[
            styles.tabIcon, {
                tintColor: tintColor
            }
        ]}/>)
    };
    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Body>
                        <Title>Monthly Log</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Under Construction</Text>
                </Content>
            </View>
        );
    }
}
