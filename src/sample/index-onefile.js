import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

const wordList = ["aiuTHRello174%()", "no time to die", "twitter", "instagram", "how old are you ?", "nice to meet you",
	"React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.",
];

const keyMapNoShift = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "\\"],
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@", "["],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "]"],
	["z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "\\"],
];

const keyMapOnShift = [
	["!", "\"", "#", "$", "%", "&", "'", "(", ")", "", "=", "~", "|"],
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "`", "{"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L", "+", "*", "}"],
	["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "_"],
];

let leftHandKey = [];

leftHandKey.push(keyMapOnShift[0].slice(0, 6));
leftHandKey.push(keyMapOnShift[1].slice(0, 5));
leftHandKey.push(keyMapOnShift[2].slice(0, 5));
leftHandKey.push(keyMapOnShift[3].slice(0, 5));

class TypingGame extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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

	handleKeyDown = (char) => {
		if (!(char === this.state.stringToBeTypedStatus.currentChar)) {
			return;
		}

		if (concatenateArray(keyMapOnShift).includes(char) && !this.shiftKeyIsCorrectly(char)) {
			return; 
		}
		const newStatus = rotateString(this.state.stringToBeTypedStatus);
		if (!newStatus.currentChar) {
			this.setState({
				wordIndex: this.state.wordIndex + 1,
				stringToBeTypedStatus: {
					finishedString: "",
					currentChar: wordList[this.state.wordIndex + 1][0],
					standByString: wordList[this.state.wordIndex + 1].slice(1),
				}
			});
			return;
		}
		this.setState({
			stringToBeTypedStatus: newStatus,
		});
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
		const kindOfPressingKey = this.setPressingKey();

		return (
			<>
				<Screen stringToBeTypedStatus={this.state.stringToBeTypedStatus} />
				<Keyboard keyMap={this.keyMapOnShift} onKeyDown={(char) => this.handleKeyDown(char)}
					informLeftShiftState={(keyIsDown) => this.switchLeftShiftPressedState(keyIsDown)}
					informRightShiftState={(keyIsDown) => this.switchRightShiftPressedState(keyIsDown)}
					pressingKeyStatus={kindOfPressingKey} />
			</>
		)
	}
}

class Screen extends React.Component {
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

function StringToBeTyped(props) {
	return (
		<>
			<span className="finished-char">{props.stringToBeTypedStatus.finishedString}</span>
			<span className="current-char">{props.stringToBeTypedStatus.currentChar}</span>
			<span className="standby-char">{props.stringToBeTypedStatus.standByString}</span>
		</>
	)
}

class Result extends React.Component {
	render() {
		return (
			<>

			</>
		)
	}
}

function Timer(props) {
	return (

		<></>
	)
}

function TypingProgress(props) {
	return (
		<></>
	)
}

class Keyboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			keyMap: keyMapNoShift,
		};
	}

	handleShiftKeyDown(isLeft, shiftIsBeingPressed) {
		if (isLeft) {
			if (shiftIsBeingPressed) {
				this.props.informLeftShiftState(true);
				this.setState({
					keyMap: keyMapOnShift,
				});
			}else {
				this.props.informLeftShiftState(false);
				this.setState({
					keyMap: keyMapNoShift,
				});
			}
		}else {
			if (shiftIsBeingPressed) {
				this.props.informRightShiftState(true);
				this.setState({
					keyMap: keyMapOnShift,
				});
			}else {
				this.props.informRightShiftState(false);
				this.setState({
					keyMap: keyMapNoShift,
				});
			}

		}
	}

	render() {
		let keyLines = Array(4).fill();
		for (const i in keyLines) {
			console.log(i);
			keyLines[i] = this.state.keyMap[i].map((char) => {
				let pressing = false;
				if (this.props.pressingKeyStatus.key === char) {
					pressing = true;
				}
				return (
					<SquareKey keyName={char} onKeyDown={this.props.onKeyDown} pressing={pressing} />
				);
			})
		}


		return (
			<div className="keyboard">
				<div className="keyboard-box">
					<div className="keyboard-line">
						{keyLines[0]}
					</div>
					<div className="keyboard-line line-2">
						{keyLines[1]}
					</div>
					<div className="keyboard-line line-3">
						{keyLines[2]}
					</div>
				</div>
				<div className="keyboard-line line-4">
					<ShiftKey isLeft={true} Pressing={false}
						informShiftIsBeingPressed={(isLeft, shiftIsPressed) => { this.handleShiftKeyDown(isLeft, shiftIsPressed) }}
						pressing={this.props.pressingKeyStatus.shift} />
					{keyLines[3]}
					<ShiftKey isLeft={false} Pressing={false}
						informShiftIsBeingPressed={(isLeft, shiftIsPressed) => { this.handleShiftKeyDown(isLeft, shiftIsPressed) }}
						pressing={this.props.pressingKeyStatus.shift} />
				</div>
				<SpaceKey Pressing={false} onKeyDown={this.props.onKeyDown} pressing={this.props.pressingKeyStatus.key} />
			</div>
		)
	}
}

class SquareKey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isBeingPressed: false,
		};
	}

	componentDidMount() {
		document.addEventListener("keydown",
			this.handleKeyDown);
		document.addEventListener("keyup",
			this.handleKeyUp);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",
			this.handleKeyDown);
		document.removeEventListener("keyup",
			this.handleKeyUp);
	}

	handleKeyDown = (e) => {
		if (this.squareKeyIsBeingPressed(e)) {
			this.props.onKeyDown(e.key);
			this.switchPressedState(true); 
		}
	}

	handleKeyUp = (e) => {
		if (this.squareKeyIsBeingPressed(e)) {
			this.switchPressedState(false);
		}
	}

	squareKeyIsBeingPressed = (e) => {
		if (e.key === this.props.keyName) {
			return true;
		}
		return false;
	}

	switchPressedState = (isBeingPressed) => {
		this.setState({
			isBeingPressed: isBeingPressed,
		});
	}

	render() {
		let keyDrawingState = "key squarekey";

		if (this.props.pressing) {
			keyDrawingState += " pressing";
		} else if (this.state.isBeingPressed) {
			keyDrawingState += " ispressed"
		}

		return (
			<div className={keyDrawingState}>
				<p>
					{this.props.keyName}
				</p>
			</div>
		)
	}

}

class ShiftKey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isBeingPressed: false,
		};
	}

	componentDidMount() {
		document.addEventListener("keydown",
			this.handleKeyDown);
		document.addEventListener("keyup",
			this.handleKeyUp);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",
			this.handleKeyDown);
		document.removeEventListener("keyup",
			this.handleKeyUp);
	}

	handleKeyDown = (e) => {
		if (this.shiftIsBeingPressed(e)) {
			const isLeft = e.code.includes("Left");
			this.props.informShiftIsBeingPressed(isLeft, true);
			this.switchPressedState(true);
		}
	}

	handleKeyUp = (e) => {
		if (this.shiftIsBeingPressed(e)) {
			const isLeft = e.code.includes("Left");
			this.props.informShiftIsBeingPressed(isLeft, false);
			this.switchPressedState(false);
		}
	}

	shiftIsBeingPressed = (e) => {
		const keyCode = this.props.isLeft ? "ShiftLeft" : "ShiftRight";
		if (e.code === keyCode) {
			return true;
		}
		return false;
	}

	switchPressedState(isBeingPressed) {
		this.setState({
			isBeingPressed: isBeingPressed,
		});
	}

	render() {
		let keyDrawingState = "key shiftkey";

		if ( (this.props.isLeft && this.props.pressing === 'l') || (!this.props.isLeft && this.props.pressing === 'r') ) {
			keyDrawingState += " pressing";
		} else if (this.state.isBeingPressed) {
			keyDrawingState += " ispressed"
		}

		const keyName = this.props.isLeft ? "LShift" : "RShift";

		return (
			<>
				<div className={keyDrawingState} >
					<p>
						{keyName}
					</p>
				</div>
			</>
		)
	}
}

class SpaceKey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isBeingPressed: false,
		};
	}

	componentDidMount() {
		document.addEventListener("keydown",
			this.handleKeyDown);
		document.addEventListener("keyup",
			this.handleKeyUp);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",
			this.handleKeyDown);
		document.removeEventListener("keyup",
			this.handleKeyUp);
	}

	handleKeyDown = (e) => {
		if (this.spaceKeyIsBeingPressed(e)) {
			this.props.onKeyDown(e.key);
			this.switchPressedState(true); 
		}
	}

	handleKeyUp = (e) => {
		if (this.spaceKeyIsBeingPressed(e)) {
			this.switchPressedState(false);
		}
	}

	spaceKeyIsBeingPressed = (e) => {
		if (e.key === " ") {
			return true;
		}
		return false;
	}

	switchPressedState = (isBeingPressed) => {
		this.setState({
			isBeingPressed: isBeingPressed,
		});
	} 


	render() {
		let keyDrawingState = "key spacekey";
		if (this.props.pressing === "space") {
			keyDrawingState += " pressing";
		} else if (this.state.isBeingPressed) {
			keyDrawingState += " ispressed";
		}

		return (
			<div className={keyDrawingState} />
		)
	}
}

function StartModal(props) {
	return (
		<></>
	)
}

ReactDOM.render(
	<TypingGame />,
	document.getElementById("root")
);

//======================== helper function ========================

function rotateString(stringToBeTypedStatus) {
	//関連した値はオブジェクトを使ってまとめる
	//実引数にも返り値にもオブジェクトを使う
	let fS = stringToBeTypedStatus.finishedString;

	return {
		finishedString: fS += stringToBeTypedStatus.currentChar,
		currentChar: stringToBeTypedStatus.standByString[0],
		standByString: stringToBeTypedStatus.standByString.slice(1),
	};
}

function concatenateArray(twoDArray) {
	let newArray = [];
	for (const array of twoDArray) {
		newArray = newArray.concat(array); 
	}

	return newArray;
}


