import React from 'react';
import "./index.css";

export default class StartModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//isAlreadyPressed: false,
			counter: 0,
		}
	}

	componentDidMount() {
		document.addEventListener("keydown",
			this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown",
			this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		if (!(e.code === "Enter") || this.state.counter) {
			return;
		}

		this.setState({
			counter: 3,
		})

		//setStateが呼び出された際は、renderに飛んでから
		//元の処理の場所に戻る?
		let countDown = setInterval(() => {
			if (this.state.counter === 1) {
				clearInterval(countDown);
				this.props.startTheGame();
			}

			this.setState({
				counter: this.state.counter - 1,
			})
		}, 1000)
	}

	render() {
		let content;
		if (!this.state.counter) {
			content = (
				<>
				<p className={"start-text"}>Press Enter !!</p>
				<p className={"flash-text"}>The game starts !!</p>
				</>
			)
		} else {
			content = (
				<p className={"countdown"}>{this.state.counter}</p>
			)	
		}

		return (
			<div className={"modal start-modal"} >
				<div className={"modal-content"}>
				{content}
				</div>
			</div>
		)
	}
}


