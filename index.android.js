/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import BaiduMap from './BaiduMap';

class RNShuttleBusComing extends Component {
  render() {
    return (
      <BaiduMap />
    );
  }
}

AppRegistry.registerComponent('RNShuttleBusComing', () => RNShuttleBusComing);
