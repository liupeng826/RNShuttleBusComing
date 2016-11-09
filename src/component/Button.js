/**
 * Created by liupeng on 2016/10/25.
 */
import React, {
	Component,
	PropTypes
} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} from 'react-native';

export default class Button extends Component {

	static propTypes = {
		label: PropTypes.string,
		onPress: PropTypes.func
	};

	static defaultProps = {
		label: 'Buttton',
		onPress() {

		}
	};

	render() {
		return (
			<TouchableHighlight
				style={styles.btn}
				onPress={this.props.onPress}>
				<Text style={{color: 'white'}}>{this.props.label}</Text>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		height: 24,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#33cc99',
		paddingLeft: 8,
		paddingRight: 8,
		margin: 4
	}
});