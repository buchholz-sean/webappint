import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {Header, Body, Title, Content, Container} from 'native-base';

// Global styles
import styles from '../styles/global';

export default class MonthlyScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Monthly Log',
        tabBarIcon: ({tintColor}) => (<Image source={require('../assets/basic_calendar.png')} style={[
            styles.tabIcon, {
                tintColor: tintColor
            }
        ]}/>)
    };
    // TODO: Monthly Log implementation...
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Monthly Log</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Under Construction</Text>
                </Content>
            </Container>
        );
    }
}
