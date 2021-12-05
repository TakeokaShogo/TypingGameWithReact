import React from 'react';
import "./index.css";

export default class SquareKey extends React.Component {
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
