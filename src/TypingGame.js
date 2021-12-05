import React from 'react';
import "./index.css";
import Screen from './Screen';
import Keyboard from './Keyboard';
import Timer from './Timer';
import TypingProgress from './TypingProgress';
import {wordList, keyMapOnShift, keyMapNoShift, leftHandKey} from './var';
import {rotateString,  concatenateArray} from './helper-methods';
import StartModal from './StartModal';
import ResultModal from './ResultModal';

export default class TypingGame extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gameProgress: "standby",  //"started", "finished"

			endingTime: 0,
			sumSeconds: 0,

			wordIndex: 0,
			stringToBeTypedStatus: {
				finishedString: "",
				currentChar: wordList[0][0],
				standByString: wordList[0].slice(1),
			},

			ShiftIsBeingPressed: {
				left: false,
				right: false,
			},
			kindOfPressingKey: "",
		}
	}

	handleKeyDown = (key) => {
		if (this.state.gameProgress === "standby") {
			return;	
		}

		if (!(key === this.state.stringToBeTypedStatus.currentChar)) {
			return;
		}

		if (!(key === " ") && concatenateArray(keyMapOnShift).includes(key) && !this.shiftKeyIsCorrectly(key)) {
			return; 
		}

		const newStatus = rotateString(this.state.stringToBeTypedStatus);
		if (!newStatus.currentChar) {
			if (this.state.wordIndex === wordList.length - 1) {
				this.setState({
					gameProgress: "finished"
				})	
				return;
			}

			this.setState({
				wordIndex: this.state.wordIndex + 1,
				stringToBeTypedStatus: {
					finishedString: "",
					currentChar: wordList[this.state.wordIndex + 1][0],
					standByString: wordList[this.state.wordIndex + 1].slice(1),
				}
			});
		}else{
			this.setState({
				stringToBeTypedStatus: newStatus,
			});
		}

	}

	shiftKeyIsCorrectly = (char) => {
		const rightShiftAndLeftHandKey = concatenateArray(leftHandKey).includes(char) && this.state.ShiftIsBeingPressed.right;
		const leftShiftAndRightHandKey = !(concatenateArray(leftHandKey).includes(char)) && this.state.ShiftIsBeingPressed.left;
		if (rightShiftAndLeftHandKey || leftShiftAndRightHandKey) {
			return true; 
		}

		return false;
	}

	switchLeftShiftPressedState = (keyIsDown) => {
		if (keyIsDown) {
			this.setState({
				ShiftIsBeingPressed: {left: true},
			});
			return;
		}

		this.setState({
			ShiftIsBeingPressed: {left: false},
		});
	}

	switchRightShiftPressedState = (keyIsDown) => {
		if (keyIsDown) {
			this.setState({
				ShiftIsBeingPressed: {right: true},
			});
			return;
		}

		this.setState({
			ShiftIsBeingPressed: {right: false},
		});
	}

	setPressingKey() {
		if (!(this.state.gameProgress === "started")) {
			return {
				key: "",
				shift: "",
			};
		}

		if (this.state.stringToBeTypedStatus.currentChar === " ") {
			return {
				key: "space",
				shift: "",
			};
		} 

		if (concatenateArray(keyMapNoShift).includes(this.state.stringToBeTypedStatus.currentChar)) {
			return {
				key: this.state.stringToBeTypedStatus.currentChar,
				shift: "",
			};
		}

		if (concatenateArray(leftHandKey).includes(this.state.stringToBeTypedStatus.currentChar)) {
			return {
				key: this.state.stringToBeTypedStatus.currentChar,
				shift: 'r',
			};
		}

		return {
			key: this.state.stringToBeTypedStatus.currentChar,
			shift: 'l',
		};
	}

	render() {
		let hasStartModal;
		let hasResultModal;
		const kindOfPressingKey = this.setPressingKey();

		if (this.state.gameProgress === "standby") {
			hasStartModal = <StartModal onKeyDown={(key) => this.handleKeyDown(key)}
			startTheGame={() => {
				this.setState({
					gameProgress: "started",	
				})	

			}} />;	
		}

		if (this.state.gameProgress === "finished") {
			hasResultModal = <ResultModal timer={this.state.endingTime} 
			sumSeconds={this.state.sumSeconds} />;
		}

		return (
			<>
			<Screen stringToBeTypedStatus={this.state.stringToBeTypedStatus} />
			<div className={"status-bar"}>
				<Timer gameProgress={this.state.gameProgress} endTheGame={(time, sumSeconds) => {
					this.setState({
						endingTime: time,	
						sumSeconds: sumSeconds,
					})	
				}} />
				<span>    </span>
				<TypingProgress wordNumber={this.state.wordIndex+1} wordSum={wordList.length} /> 
			</div>
			<Keyboard keyMap={this.keyMapOnShift} onKeyDown={(char) => this.handleKeyDown(char)}
			informLeftShiftState={(keyIsDown) => this.switchLeftShiftPressedState(keyIsDown)}
			informRightShiftState={(keyIsDown) => this.switchRightShiftPressedState(keyIsDown)}
			pressingKeyStatus={kindOfPressingKey} />

			{hasStartModal}
			{hasResultModal}
			</>
		)
	}
}


