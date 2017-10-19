import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {Header, Body, Title, Content, Container} from 'native-base';

// Global styles
import styles from '../styles/global';

export default class Future extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Future Log',
        tabBarIcon: ({tintColor}) => (<Image source={require('../assets/basic_elaboration_calendar_next.png')} style={[
            styles.tabIcon, {
                tintColor: tintColor
            }
        ]}/>)
    };
    // TODO: Future Log implementation...
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Future Log</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>Under Construction</Text>
                </Content>
            </Container>
        );
    }
}
