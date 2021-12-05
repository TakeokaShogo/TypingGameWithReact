import React from "react";
import "./index.css";
import StringToBeTyped from './StringToBeTyped';

export default class Screen extends React.Component {
	render() {
		return (
			<div className="screen">
				<div className="screen-box">
					<StringToBeTyped stringToBeTypedStatus={this.props.stringToBeTypedStatus} />
				</div>
			</div>
		)
	}
}
