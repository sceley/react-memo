import React, { Component } from 'react';
import Footer from './Footer';
import selectTables from "./db/selectTables";
import { selectTable } from "./db/table";
import "./css/Home.css";

class AMemo extends Component {
	constructor (props) {
		super(props);
		console.log(props.memo);
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
			</div>
		);
	}
};

class Tip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tips: []
		};
	}
	componentWillMount() {
		new Promise(resolve => {
			selectTables(resolve);
		}).then(result => {
			let promise = [];
			for(let i = 0; i < result.length; i++){
				promise.push(new Promise(resolve => {
					selectTable(resolve, result[i].tableName);
				}));
			}
			Promise.all(promise).then(arr => {
				let date = new Date().toLocaleDateString();
				let newdate = date.replace(/\//g, "-");
				let tips = [];
				for(let i = 0; i < arr.length; i++){
					for(let j = 0; j < arr[i].length; j++){
						if (newdate === arr[i][j].date.replace(/-0/g, '-')) {
							tips.push(<AMemo key={j} memo={ arr[i][j] }/>);
						}
					}
				}
				this.setState({
					tips
				});
			});
		});
	}
	render () {
		return (
			<div className="home-amemo">{ this.state.tips }</div>
		);
	}
};
class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
		};
	}
	render () {
		return (
			<div className="component-wrap">
				<div className="header">
					<span className="glyphicon glyphicon-home"/>
					首页
				</div>
				<div className="content">
					<img className="img-circle img-lang" src="/lang.jpg" alt=""/>
					<div className="motto">
						<p>时间不允许我们彷徨</p>
						<p>空间不允许我们犹豫</p>
					</div>
					<div className="tip">今天的提示：</div>
					<Tip/>
				</div>
				<Footer select="home"/>
			</div>
		);
	}
}
export default Home;