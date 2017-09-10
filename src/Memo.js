import React, { Component } from 'react';
import './css/Memo.css';
import Footer from "./Footer";
import addTable from "./db/addTable";
import Tables from "./Tables";
export default class Memo extends Component {
	constructor (props) {
		super(props);
		this.showMaskLayer = this.showMaskLayer.bind(this);
		this.hiddenMaskLayer = this.hiddenMaskLayer.bind(this);
		this.submit = this.submit.bind(this);
	}
	showMaskLayer () {
		this.refs.maskLayer.style.display = 'flex';
	}
	hiddenMaskLayer () {
		this.refs.maskLayer.style.display = 'none';
	}
	submit () {
		new Promise(resolve => {
			if(this.refs.input.value.trim()){
				addTable(resolve, this.refs.input.value);
			}
		}).then(() => {
			this.refs.maskLayer.style.display = 'none';
		});
	}
	render () {
		return (
			<div className="component-wrap">
				<div className="header">
					<div className="add-icon-wrap">
						<button onClick={this.showMaskLayer} className="btn btn-primary glyphicon glyphicon-plus"/>
					</div>
					<div>
						<span className="glyphicon glyphicon-tags"/>
						备忘录
					</div>	
				</div>
				<div className="content">
					<div className="directory-title">文件夹</div>
					<Tables/>
				</div>
				<Footer select="memo"/>
				<div ref="maskLayer" className="maskLayer">
					<div className="flex flex-column new-directory-wrap">
						<div>新建</div>
						<div>请输入名称</div>
						<input className="directory-name-input" ref="input" type="text"/>
						<div className="choose-wrap">
							<a onClick={this.hiddenMaskLayer} className="choose-cell">Cancel</a>
							<a onClick={this.submit} className="choose-cell">提交</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
};