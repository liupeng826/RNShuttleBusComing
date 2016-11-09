/**
 * Created by liupeng on 2016/10/25.
 */
import React, {
	Component
} from 'react';

export default class NetUtil extends React.Component {

	//post请求
	/**
	 *url :请求地址
	 *data:参数
	 *callback:回调函数
	 */
	postFrom (url, data, callback) {
		let fetchOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'data=' + data + ''//这里我参数只有一个data,大家可以还有更多的参数
		};

		fetch(url, fetchOptions)
			.then((response) => response.text())
			.then((responseText) => {
				callback(JSON.parse(responseText));
			}).done();
	};

	/**
	 *url :请求地址
	 *data:参数(Json对象)
	 *callback:回调函数
	 */
	postJson(url, data, callback) {
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
	};

	//get请求
	/**
	 *url :请求地址
	 *callback:回调函数
	 */
	get(url, callback) {
		fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
				callback(JSON.parse(responseText));
			}).done();
	}

};