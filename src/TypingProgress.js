import React from 'react';
import "./index.css";

export default function TypingProgress(props) {
	return (
		<span className={"word-number"}>
		{props.wordNumber}/{props.wordSum} :number of words remaining
		</span>
	)
}
