
export function rotateString(stringToBeTypedStatus) {
	//関連した値はオブジェクトを使ってまとめる
	//実引数にも返り値にもオブジェクトを使う
	let fS = stringToBeTypedStatus.finishedString;

	return {
		finishedString: fS += stringToBeTypedStatus.currentChar,
		currentChar: stringToBeTypedStatus.standByString[0],
		standByString: stringToBeTypedStatus.standByString.slice(1),
	};
}

export function concatenateArray(twoDArray) {
	let newArray = [];
	for (const array of twoDArray) {
		newArray = newArray.concat(array); 
	}

	return newArray;
}

export function concatenateString(Array) {
	let concatenatedString = "";
	for (const string of Array) {
		concatenatedString = concatenatedString.concat(string); 
	}

	return concatenatedString;
}


