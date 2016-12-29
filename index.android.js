/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import WeixinTabBar from './Tab';
import SampleComponent from './SampleComponent';

class SampleAppMovies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['正在上映', '即将上映', '北美票房榜', 'Top榜'],
            tabIconNames: ['md-flame', 'md-videocam', 'logo-usd', 'md-thumbs-up'],
        };
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                renderTabBar={() => <WeixinTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                tabBarPosition='bottom'>

                <SampleComponent tabLabel='key1'/>

                <View style={styles.content} tabLabel='key2'>
                    <Text>#2</Text>
                </View>

                <View style={styles.content} tabLabel='key3'>
                    <Text>#3</Text>
                </View>

                <View style={styles.content} tabLabel='key4'>
                    <Text>#4</Text>
                </View>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
        flex: 1
    }
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);