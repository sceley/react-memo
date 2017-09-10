import React, { Component } from "react";
import { selectTable } from "./db/table";

export default class Table extends Component {
	constructor (props) {
		super(props);
		this.state = {
			memo: ''
		};
	}
	componentWillMount () {
		new Promise(resolve => {
			selectTable(resolve, this.props.tableName);
		}).then(memo => {
			this.setState({
				memo
			});
		});
	}
	render () {
		let tableName = this.props.tableName;
		let memoLength = this.state.memo.length;
		return (
			<a href={"/unfolded/" + tableName} className="table">
				<div className="table-memo-total">
					{ memoLength }
				</div>
				<div className="tableName">
					{ tableName }
				</div>
			</a>
		);
	}
};