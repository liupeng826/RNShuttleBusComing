/**
 * @author lovebing
 */

import React, {
	Component,
	PropTypes
} from 'react';

import {
	MapView,
	MapTypes,
	Geolocation
} from 'react-native-baidu-map';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Dimensions from 'Dimensions';
import Button from './src/component/Button';

const REQUEST_URL = 'http://180.76.169.196:8000/api/coordinate';

export default class BaiduMap extends Component {

	constructor(props) {
		super(props);

		this.state = {
			initialPosition: 'unknown',
			lastPosition: 'unknown',
			mayType: MapTypes.NORMAL,
			zoom: 15,
			center: {
				longitude: 117.406305,
				latitude: 39.155326,
			},
			trafficEnabled: false,
			baiduHeatMapEnabled: false,
			markers: [],
			dataSource: [],
			longitudeNow: 117.406305,
			latitudeNow: 39.155326,
			loaded: false,
			deviceUniqueID: DeviceInfo.getUniqueID(),
		};

		this.fetchData = this.fetchData.bind(this);
		this.savePosition = this.savePosition.bind(this);
		this.setMarkers = this.setMarkers.bind(this);
	}

	//拉取投放的数据
	fetchData = () => {
		console.log('fetchData');
		let me = this;
		fetch(REQUEST_URL)
			.then((response) => response.json())
			.then(responseData => {
				me.setState({
					dataSource: responseData.data,
					loaded: true,
				});
				console.log(responseData.data);
				me.setMarkers();
			})
			.catch(e => {
				console.warn(e, 'error');
			}).done();
	}

	setMarkers = () => {
		console.log('setMarkers');
		let me = this;
		if (me.state.loaded && me.state.dataSource !== 'undefined') {
			me.setState({
				markers: me.state.dataSource.map((val, index, arr) => {
					return {latitude: val.lat * 1, longitude: val.lng * 1, title: "班车"}
				})
			});
		}
	}

	/**
	 *url :请求地址
	 *data:参数(Json对象)
	 *callback:回调函数
	 */
	postJson = (url, data, callback) => {
		let fetchOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				//json形式
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};

		fetch(url, fetchOptions)
			.then((response) => response.text())
			.then((responseText) => {
				callback(JSON.parse(responseText));
			}).done();
	}

	savePosition = () => {
		console.log('savePosition');
		Geolocation.getCurrentPosition()
			.then(position => {
				// 设置当前位置
				// this.setState({
				// 	zoom: 18,
				// 	marker: {
				// 		latitude: data.latitude,
				// 		longitude: data.longitude,
				// 		title: '我的位置'
				// 	},
				// 	longitudeNow: data.longitude,
				// 	latitudeNow: data.latitude,
				// });

				// 保存当前位置
				let positionJsonData = {
					'user': this.state.deviceUniqueID,
					'lat': position.latitude,
					'lng': position.longitude,
					'createdTime': (new Date()).valueOf()
				};
				this.postJson(REQUEST_URL, positionJsonData, function (set) {
					console.log(set.data.result);
				});
			})
			.catch(e => {
				console.warn(e, 'error');
			})
	}

	componentDidMount() {
		this.timer = setInterval(
			() => {

				navigator.geolocation.getCurrentPosition(
					(position) => {
						let initialPosition = JSON.stringify(position);
						this.setState({initialPosition});
					},
					(error) => alert(error.message),
					{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
				);

				this.watchID = navigator.geolocation.watchPosition((position) => {
					let lastPosition = JSON.stringify(position);
					this.setState({lastPosition});
				});

				this.fetchData();
				this.savePosition();
			}, 3000
		);

		// post position json data into database
		//this.savePosition();
	}

	componentWillUnmount() {
		this.timer && clearInterval(this.timer);
		navigator.geolocation.clearWatch(this.watchID);
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					trafficEnabled={this.state.trafficEnabled}
					baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
					zoom={this.state.zoom}
					mapType={this.state.mapType}
					center={this.state.center}
					marker={this.state.marker}
					markers={this.state.markers}
					onMapClick={(e) => {
          }}
				>
				</MapView>

				<View style={styles.row}>
					<Button label="我的位置" onPress={() => {
            Geolocation.getCurrentPosition()
              .then(data => {
                this.setState({
                  zoom: 18,
                  marker: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    title: '我的位置'
                  },
                  center: {
                    latitude: data.latitude,
                    longitude: data.longitude
                  }
                });
              })
              .catch(e =>{
                console.warn(e, 'error');
              })
          }}/>

					<Button label="路况" onPress={() => {
            this.setState({
              trafficEnabled: !this.state.trafficEnabled
            });
          }}/>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		marginTop: Dimensions.get('window').height - 110,
		flexDirection: 'column',
	},
	btn: {
		height: 24,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#33cc99',
		paddingLeft: 8,
		paddingRight: 8,
		margin: 4
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	map: {
		position: 'absolute',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - 50,
		marginBottom: 16
	}
});
