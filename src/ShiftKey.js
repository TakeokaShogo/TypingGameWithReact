import React from 'react';
import "./index.css";

export default class ShiftKey extends React.Component {
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
