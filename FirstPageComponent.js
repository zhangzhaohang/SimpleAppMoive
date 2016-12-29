/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
} from 'react-native';

import SecondPageComponent from './SecondPageComponent';

var REQUEST_URL = 'https://api.douban.com/v2/movie/in_theaters';

class FirstPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
        this._pressButton = this._pressButton.bind(this);
    }


    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
                    loaded: true,
                });
            });
    }


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }


        return (

            <View>
                <Text style={styles.header}>
                    正在上映
                </Text>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderInfo}
                        style={styles.listView}
                    />

            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }

    renderInfo(movie) {
        return (

            <TouchableOpacity style={styles.container} onPress={()=>{this._pressButton()}}>
                <View style={styles.container}>

                    <Image
                        source={{uri: movie.images.small}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <Text style={styles.year}>年份：{movie.year}</Text>
                        <Text style={styles.year}>影片类型：{movie.genres}</Text>
                        <Text style={styles.year}>豆瓣评分：{movie.rating.average}</Text>
                    </View>

                </View>
                </TouchableOpacity>

        );
    }

    _pressButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'SecondPageComponent',
                component: SecondPageComponent,
            })
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderBottomWidth: 1,
        borderBottomColor:'#c9c9c9',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        color: 'black',
    },
    year: {

    },
    thumbnail: {
        width: 53,
        height: 81,
        margin:  20,
    },
    listView: {
        backgroundColor: '#F5FCFF',
    },
    header: {
        color: 'white',
        height: 45,
        backgroundColor: '#0d9eea',
        fontSize: 18,
        textAlign:'center',
        paddingTop: 10,
    },
});
export default FirstPageComponent