
export const wordList = [
	"dog",
	"cat",
	"follow me",
	"no time to die",
	"how old are you ?",
	"nice to meet you",
	"Hello World !!!",
	"className={}",
	"[Array]",
	"const keyMap = {",
	"$(\".button\")",
	"this.set(undefined, config);"
	//"React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.",
];

export const keyMapNoShift = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "\\"],
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@", "["],
	["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "]"],
	["z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "\\"],
];

export const keyMapOnShift = [
	["!", "\"", "#", "$", "%", "&", "'", "(", ")", " ", "=", "~", "|"],
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "`", "{"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L", "+", "*", "}"],
	["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "_"],
];

let l = [];

l.push(keyMapOnShift[0].slice(0, 6));
l.push(keyMapOnShift[1].slice(0, 5));
l.push(keyMapOnShift[2].slice(0, 5));
l.push(keyMapOnShift[3].slice(0, 5));

export const leftHandKey = l;
