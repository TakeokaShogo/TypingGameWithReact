import React from 'react';
import "./index.css";

export default class Timer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			minute: 0,
			second: 0,
			timeToString: "00:00",
			timerIsAlreadyStarted: false,
		}
	}

	componentDidUpdate(){
		if (!(this.props.gameProgress === "started") || this.state.timerIsAlreadyStarted) {
			return;	
		}

		this.updateTimer();
	}

	updateTimer(){
		this.setState({
			timerIsAlreadyStarted: true,
		})

		let m = this.state.minute;
		let s = this.state.second;

		let calculateTime = setInterval(() => {
			if (this.props.gameProgress === "finished") {
				this.stopTimer(calculateTime);	
			}

			s++;

			if (s === 60) {
				s = 0;
				m++;
			}

			let renderedMinute = String(m);
			let renderedSecond = String(s);

			if (m <= 9) {
				renderedMinute = '0' + 	String(m);
			}

			if (s <= 9) {
				renderedSecond = '0' + 	String(s);
			}

			this.setState({
				minute: m,
				second: s,
				timeToString: renderedMinute + ':' + renderedSecond,
			})
		}, 1000)

	}

	stopTimer(func){
		clearInterval(func);
		this.props.endTheGame(
			this.state.timeToString,
			this.state.minute*60 + this.state.second
		)
	}

	render() {

		return (
			<span className={"timer"}>
			{this.state.timeToString}
			</span>
		)	
	}
}


