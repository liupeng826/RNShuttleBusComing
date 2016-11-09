/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Picker
} from 'react-native';

export default class Me extends Component {
	constructor(props) {
		super(props);
		this.state = {
			busline: '',
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>我的班车线路</Text>
				<Picker
					style={{width:100}}
					selectedValue={this.state.busline}
					onValueChange={(value) => this.setState({busline: value})}>
					<Picker.Item label="" value=""/>
					<Picker.Item label="1号线" value="1号线"/>
					<Picker.Item label="2号线" value="2号线"/>
					<Picker.Item label="3号线" value="3号线"/>
					<Picker.Item label="4号线" value="4号线"/>
					<Picker.Item label="5号线" value="5号线"/>
					<Picker.Item label="6号线" value="6号线"/>
				</Picker>
				<Text>我选择的是:{this.state.busline}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

