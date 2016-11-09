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
	TabBarIOS,
	NavigatorIOS,
  TouchableHighlight
} from 'react-native';

import BaiduMap from './BaiduMap';
import Me from './src/Me';

class RNShuttleBusComing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'home',
		};
	}

	changeTab = (tabName)=> {
		this.setState({
			selectedTab: tabName
		});
	}

  render() {
    return (
	    <TabBarIOS>
		    <TabBarIOS.Item
			    title="首页"
			    icon={require('image!icon_tabbar_homepage_selected')}
			    onPress={()=> this.changeTab('home')}
			    selected={ this.state.selectedTab === 'home'}>
			    <NavigatorIOS
				    style={styles.container}
				    initialRoute={{
            title: '首页',
            component: BaiduMap,
            navigationBarHidden: true,
            }}
			    />
		    </TabBarIOS.Item>

		    <TabBarIOS.Item
			    title="我的"
			    icon={require('image!icon_tabbar_mine')}
			    onPress={()=> this.changeTab('wode')}
			    selected={ this.state.selectedTab === 'wode'}>
			    <NavigatorIOS
				    style={styles.container}
				    initialRoute={{
            title: '设置',
            component: Me,
            navigationBarHidden: true,
            }}
			    />
		    </TabBarIOS.Item>
	    </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
	pageView: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});

AppRegistry.registerComponent('RNShuttleBusComing', () => RNShuttleBusComing);
