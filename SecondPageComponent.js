/**
 * Created by Mr.zhang on 2016/12/7.
 */
import React from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import FirstPageComponent from './FirstPageComponent';

export default class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.lalala} onPress={this._pressButton.bind(this)}>
                    <Text style={styles.lllText}>返回</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    lalala: {
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor:'#0d9eea',
        borderRadius:10,
    },

    lllText: {
        fontSize: 18,
    }
});