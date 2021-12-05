import React from 'react';
import "./index.css";

export default class SpaceKey extends React.Component {
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
