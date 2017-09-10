import React from 'react';
export default (props) => (
	<div className="footer">
	    <a className={props.select==='home'?'select-navigator navbar-cell':'navbar-cell'} href='/'>
	        <span className="glyphicon glyphicon-home"></span>
	        首页
	    </a>
	    <a className={props.select==='memo'?'select-navigator navbar-cell':'navbar-cell'} href="/memo">
	        <span className="glyphicon glyphicon-tags"></span>
	        备忘录
	    </a>
	</div>
);