import React from "react";
import "./index.css";

export default function StringToBeTyped(props) {
	return (
		<>
			<span className="finished-char">{props.stringToBeTypedStatus.finishedString}</span>
			<span className="current-char">{props.stringToBeTypedStatus.currentChar}</span>
			<span className="standby-char">{props.stringToBeTypedStatus.standByString}</span>
		</>
	)
}
