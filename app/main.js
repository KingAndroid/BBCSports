/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

import Detail from './detail'; 

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        };
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews() {
        var NEWS_API = 'https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=b53e112b81344b57ada1f227e4b1e3cb';
        fetch(NEWS_API)
        .then(resp => resp.json())
        .then(respData => {
            this.setState({
            dataSource: this.state.dataSource.cloneWithRows(respData.articles),
            loaded: true})
        }).done();
    }

    render() {
        // Empty View!
        if (!this.state.loaded) {
            return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Loading Sports News...
                </Text>
            </View>
            );
        }

        // Render real news data!
        return (
            <ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={news => {
                return (
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigator.push({
                                title: 'News Detail',
                                component: Detail,
                                passProps: {data: news}
                            });
                        }}
                        style={styles.cellContainer}>
                        <Image source={{uri: news.urlToImage}}
                            style={styles.cellImg} />
                        <Text style={styles.cellTitle}>
                            {news.title}
                        </Text>
                        <Text style={styles.cellAuther}>
                            {news.author}
                        </Text>
                    </TouchableOpacity>
                );
            }}/>
        );
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    emptyText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    listView: {
        backgroundColor: 'gray'
    },
    cellContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius:4,
        padding: 4,
        margin: 4,
        backgroundColor: 'white'
    },
    cellImg: {
        flex: 1,
        height: 200
    },
    cellAuther: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    cellTitle: {
        fontSize: 20,
    }
});
