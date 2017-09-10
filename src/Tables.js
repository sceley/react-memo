import React, { Component } from "react";
import Table from "./Table";
import selectTables from "./db/selectTables";

export default class Tables extends Component {
	constructor (props) {
		super(props);
		this.state = {
			tables: []
		};
	}
	componentWillReceiveProps() {
		this.componentWillMount();
	}
	componentWillMount () {
	 	new Promise(resolve => {
	 		selectTables(resolve);
	 	}).then(tables => {
	 		this.setState({
	 			tables
	 		});
	 	});
	}
	render () {
		let arr = [];
		let tables = this.state.tables;
		console.log();
		for(let i = 0; i < tables.length; i++){
			arr.push(<Table key={i} tableName={ tables[i].tableName }/>);
		}
		return (
			<div className="tables">{ arr }</div>
		);
	}
};