import react from 'react';
import {StyleSheet} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    tabIcon: {
        width: 26,
        height: 26,
        tintColor: '#3b5998'
    },
    submitButton: {
        backgroundColor: '#3b5998'
    },
    listEntry: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    listIcon: {
        width: 26,
        height: 26
    },
    listText: {
        fontSize: 18
    }
});

export default styles;
