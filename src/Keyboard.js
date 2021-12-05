import React from 'react';
import "./index.css";
import SquareKey from './SquareKey';
import ShiftKey from './ShiftKey';
import SpaceKey from './SpaceKey';
import {keyMapNoShift, keyMapOnShift} from './var';

export default class Keyboard extends React.Component {
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
