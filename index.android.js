import React, { Component } from 'react';
import {
    AppRegistry,
    BackAndroid,
    Navigator,
    TouchableHighlight,
    Text, View
} from 'react-native';

import Main from './app/main';

export default class BBSSports extends Component {
  constructor() {
    super();
    this.navigator = null;
  }
    handleBack() {
      if (this.navigator.getCurrentRoutes().length > 0) {
        this.navigator.pop();
        return true;
      }
      return false;
    }

    componentDidMount() {
      BackAndroid.addEventListener(
        'hardwareBackPress',
        this.handleBack);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener(
        'hardwareBackPress',
        this.handleBack);
    }

    render() {
       return (
        <Navigator
          ref={navigator => this.navigator = navigator}
          initialRoute={{component: Main, title: 'News List', passProps: null}}
          renderScene={(route, navigator) => {
             return (<route.component {...route.passProps} navigator={navigator} route={route} />);
          }}/>
        );
    }
}

AppRegistry.registerComponent('BBSSports', () => BBSSports);