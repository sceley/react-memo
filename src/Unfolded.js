import React, { Component } from "react";
import { insertTable } from "./db/table";
import "./css/unfolded.css";
import Memos from "./Memos";
export default class Unfolded extends Component {
	constructor ({ match }) {
		super();
		let tableName = match.params.tableName;
		this.state = {
			tableName
		};
		this.submit = this.submit.bind(this);
		this.maskLayer = this.maskLayer.bind(this);
		this.showMaskLayer = this.showMaskLayer.bind(this);
	}
	showMaskLayer () {
		this.refs.maskLayer.style.display = 'flex';
	}
	maskLayer (e) {
		if(this.refs.maskLayer === e.target) {
			this.refs.maskLayer.style.display = 'none';
		}
	}
	submit () {
		let tableName = this.state.tableName;
		let place = this.refs.place.value;
		let date = this.refs.date.value;
		let time = this.refs.time.value;
		let memo = this.refs.memo.value;
		new Promise(resolve => {
			insertTable(resolve, tableName, {
				place,
				date,
				time,
				memo
			});
		}).then(() => {
			this.forceUpdate();
			this.refs.maskLayer.style.display = 'none';
		});
	}
	render () {
		return (
			<div className="Unfolded">
				<div className="header">
					<a href="/memo">
						<button className="btn btn-primary glyphicon glyphicon-menu-left"></button>
					</a>
					<div className="tags-wrap">
						<span className="glyphicon glyphicon-tags"/>
						<div>{ this.state.tableName }</div>
					</div>
					<a onClick={ this.showMaskLayer }>
						<button className="btn btn-primary glyphicon glyphicon-plus"/>
					</a>
				</div>
				<Memos tableName={ this.state.tableName }/>
				<div ref="maskLayer" onClick={ this.maskLayer } className="maskLayer">
					<div className="panel panel-primary">
						<div className="panel-heading">
							新建备忘录
						</div>
						<div className="panel-body">
							<div className="form-group">
								<div className="input-group">
								    <div className="input-group-addon">日期</div>
								    <input ref="date" type="date" className="form-control" placeholder="Email"/>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group">
								    <div className="input-group-addon">时间</div>
								    <input ref="time" type="time" className="form-control" placeholder="Email"/>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group">
								    <div className="input-group-addon">地点</div>
								    <input ref="place" type="text" className="form-control" placeholder="地点"/>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group">
								    <div className="input-group-addon">备忘录</div>
								    <textarea ref="memo" className="form-control" placeholder="备忘录"/>
								</div>
							</div>
						</div>
						<div className="panel-footer">
							<button onClick={ this.submit } className="btn btn-primary">提交</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};