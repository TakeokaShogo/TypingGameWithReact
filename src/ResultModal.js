import React from 'react';
import "./index.css";
import { concatenateString } from './helper-methods';
import {wordList} from './var';

export default class ResultModal extends React.Component {
	render() {
		const numberOfAllTypes = concatenateString(wordList).length;
		const digit = 4;
		const TPS = parseInt(numberOfAllTypes / this.props.sumSeconds * 10**(digit - 1) ) / 10**(digit - 1);
		//alert(numberOfAllTypes / this.props.sumSeconds);
		return (
			<>
			<div className={"modal result-modal"} >
				<div className={"modal-content"}>
					<p className={"result-title"}>Result</p>
			<p>Type Per Seconds:		{TPS}</p>
			<p>Time:		{this.props.timer}</p>
			<p>The Number Of Types:		{numberOfAllTypes}</p>
			<p>The Number Of Words:		{wordList.length}</p>
				</div>
			</div>

			</>
		)
	}
}
