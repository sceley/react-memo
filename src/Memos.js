import React, { Component } from "react";
import { selectTable, removeAMemo } from "./db/table";
class AMemo extends Component {
	constructor (props) {
		super(props);
		this.remove = this.remove.bind(this);
	}
	remove () {
		new Promise(resolve => {
			removeAMemo(resolve, this.props.tableName, this.props.memo);
		}).then(() => {
			this.refs.aMemo.remove();
		});
		
	}
	render () {
		let data = this.props.memo;
		return (
			<div ref="aMemo" className="amemo flex">
				<div className="flex-col-xs-4">
					<div className="icon-list">
						<span className="icon glyphicon glyphicon-calendar"/>
						<span>{ data.date }</span>
					</div>
					<div className="icon-list">
						<span className="icon glyphicon glyphicon-time"/>
						<span>{ data.time }</span>
					</div>
					<div className="icon-list">
						<span className="icon glyphicon glyphicon-globe"/>
						<span>{ data.place }</span>
					</div>
				</div>
				<div className="flex-col-xs-5">
					{ data.memo }
				</div>
				<div className="flex-col-xs-1">
					<span onClick={ this.remove } className="remove">×</span>
				</div>
			</div>
		);
	}
};
	
export default class Memos extends Component {
	constructor (props) {
		super(props);
		this.state = {
			memos: []
		};
	}
	componentWillReceiveProps () {
		this.componentWillMount();
	}
	componentWillMount () {
		let tableName = this.props.tableName;
		new Promise(resolve => {
			selectTable(resolve, tableName);
		}).then(result => {
			let memos = [];
			for(let i = 0; i < result.length; i++){
				memos.push(<AMemo tableName={ tableName } key={i} memo={ result[i] }/>);
			}
			this.setState({
				memos
			});
		});
	}
	render () {
		return (
			<div>{ this.state.memos }</div>
		);
	}
};