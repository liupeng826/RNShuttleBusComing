/**
 * Created by liupeng on 2016/10/25.
 */
import React, {
	Component,
	StyleSheet,
	Text,
	View,
} from 'react-native';

export default class PersonalTab extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.welcome}>
						Welcome to React Native!
					</Text>
				</View>
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
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
