import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

let wordList = ["aiuTHRello174%()", "no time to die", "twitter", "instagram", "how old are you ?", "nice to meet you",
    "React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.",
];


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wordNumber: 0,
            finishedChars: "",
            currentChar: wordList[0][0],
            standbyChars: wordList[0].slice(1),
            currentPressingKey: "",
            shfitSide: "",
            spaceIsBeingPressed: false,
        };

        //this.handleKeyDown = this.handleKeyDown.bind(this);
        //this.hancleKeyUp = this.handleKeyUp.bind(this);
	//bindメソッドは関数オブジェクトに所属するメソッドで、引数に渡したオブジェクトを
	//その関数内のthisとして扱えるようにする。
	//しかし、アロー関数はデフォルトで関数の外のthisを参照できるので、上記二文は意味がない。 
    }

    render() {
        return (
            <>
                <Screen finishedChars={this.state.finishedChars} currentChar={this.state.currentChar} standbyChars={this.state.standbyChars} />
                <Keyboard nextKeyToPress={this.state.currentChar} currentPressingKey={this.state.currentPressingKey} 
                shiftSide={this.state.shiftSide} spaceIsBeingPressed={this.state.spaceIsBeingPressed}/>
            </>
        )
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
        
        let currentPressingKey = "";
        let shiftSide = "";
        let spaceIsBeingPressed = false;
        let nextWordState = [this.state.wordNumber, this.state.finishedChars, 
        this.state.currentChar, this.state.standbyChars, this.state.currentPressingKey];
        
        if (e.key === " ") {
            spaceIsBeingPressed = true;
        }
        
        if (e.code.includes("Shift") || this.state.currentChar === " ") {
            if (e.code === "ShiftLeft") {
               shiftSide = "left";
            }else {
               shiftSide = "right";
            }    
        }
            currentPressingKey = e.key;

        if (this.state.currentChar === e.key) {
            nextWordState = this.getNextWordState();
        }

        this.setState({
            wordNumber: nextWordState[0],
            finishedChars: nextWordState[1],
            currentChar: nextWordState[2],
            standbyChars: nextWordState[3],
            currentPressingKey: currentPressingKey,
            shiftSide: shiftSide,
            spaceIsBeingPressed: spaceIsBeingPressed,
        });

        // this.setWordState(e.key);
    }

    handleKeyUp = (e) => {
        if (e.code.includes("Shift")) {
            this.setState({
                shiftSide: "",
            });
        }

        this.setState({
            currentPressingKey: "",
        });
    }

    getNextWordState() {
        let wN = this.state.wordNumber;
        let fC = this.state.finishedChars;
        let cC = "";
        let sC = "";

        if (this.state.standbyChars) {
            fC += this.state.currentChar;
            cC = this.state.standbyChars[0];
            sC = this.state.standbyChars.slice(1);
        } else {
            wN++;
            fC = "";
            cC = wordList[wN][0];
            sC = wordList[wN].slice(1);
        }

        return [wN, fC, cC, sC];

    }

}

class Screen extends React.Component {
    render() {
        return (
            <div className="screen">
                <div className="screen-box">
                    <span className="finished-char">{this.props.finishedChars}</span>
                    <span className="current-char">{this.props.currentChar}</span>
                    <span className="standby-char">{this.props.standbyChars}</span>
                </div>
            </div>
        )
    }
}

class SquareKey extends React.Component {
    render() {
        let keyDrawingState = "key squarekey";

        if (this.props.toPress) {
            keyDrawingState += " topress";
        }else if (this.props.isPressed) {
            keyDrawingState += " ispressed"
        }

        return (
            <div className={keyDrawingState}>
                <p>
                    {this.props.drawKey}
                </p>
            </div>
        )
    }
}

class SpecialKey extends React.Component {
    render() {
        let leftShiftKeyClassName = "key shiftkey";
        let rightShiftKeyClassName = "key shiftkey";
        let spaceKeyClassName = "key spacekey";
        let toPressClass = " topress";

        if (this.props.toPress === "space") {
            spaceKeyClassName += toPressClass;
        } else if (this.props.toPress === "left") {
            leftShiftKeyClassName += toPressClass;
        } else if (this.props.toPress === "right") {
            rightShiftKeyClassName += toPressClass;
        }

        return (
            <>
                <div className={leftShiftKeyClassName}>
                    <p>
                        LShift
                    </p>
                </div>
                <div className={spaceKeyClassName}>
                    <p>
                        Space
                    </p>
                </div>
                <div className={rightShiftKeyClassName}>
                    <p>
                        RShift
                    </p>
                </div>
            </>
        )
    }
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.keyMapNoShift = [
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "\\"],
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@", "["],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "]"],
            ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "\\"],
        ];
        this.keyMapOnShift = [
            ["!", "\"", "#", "$", "%", "&", "'", "(", ")", " ", "=", "~", "|"],
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "`", "{"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", "+", "*", "}"],
            ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "_"],
        ];

        this.isLeftSide = false;
        this.isNChar = false;

    }

    chooseKeyMap() {
        if (this.keyMapNoShift[0].includes(this.props.nextKeyToPress) ||
            this.keyMapNoShift[1].includes(this.props.nextKeyToPress) ||
            this.keyMapNoShift[2].includes(this.props.nextKeyToPress) ||
            this.keyMapNoShift[3].includes(this.props.nextKeyToPress)
        ) {
            this.isNChar = true;  
            this.keyMap = this.keyMapNoShift;
            return;
        }

        this.isNChar = false;
        let leftHandKey = [];
        leftHandKey = leftHandKey.concat(this.keyMapOnShift[0].slice(0, 6));
        leftHandKey = leftHandKey.concat(this.keyMapOnShift[1].slice(0, 5));
        leftHandKey = leftHandKey.concat(this.keyMapOnShift[2].slice(0, 5));
        leftHandKey = leftHandKey.concat(this.keyMapOnShift[3].slice(0, 5));
        // sliceの二つ目の引数はインデックス番号-1
        
        this.isLeftSide = leftHandKey.includes(this.props.nextKeyToPress);
        console.log(this.isLeftSide);
        
        if ((this.props.shiftSide === "right" && this.isLeftSide) ||
            (this.props.shiftSide === "left" && !this.isLeftSide)) {
            this.keyMap = this.keyMapOnShift; 
            return;
        }

            console.log("third");
        this.keyMap = this.keyMapNoShift;
    }

    renderSquareKey(drawKey) {
        let toPress;
        let isPressed;

        if (drawKey === this.props.nextKeyToPress) {
            toPress = true;
        } else {
            toPress = false;
        }

        if (drawKey === this.props.currentPressingKey) {
            isPressed = true;
        } else {
            isPressed = false;
        }

        return <SquareKey drawKey={drawKey} toPress={toPress} isPressed={isPressed} />;
    }

    renderSpecialKey() {
        if (this.props.nextKeyToPress === " ") {
            return <SpecialKey toPress={"space"} />
        }

        if (this.isNChar) {
            console.log("HOW");
            return <SpecialKey toPress={""} />
        }

        if (this.isLeftSide) {
            return <SpecialKey toPress={"right"} />
        }

        return <SpecialKey toPress={"left"} />

    }

    render() {
        this.chooseKeyMap();

        return (
            <div className="keyboard">
                <div className="keyboard-line">
                    {this.keyMap[0].map((key) => this.renderSquareKey(key))}
                </div>
                <div className="keyboard-line line-2">
                    {this.keyMap[1].map((key) => this.renderSquareKey(key))}
                </div>
                <div className="keyboard-line line-3">
                    {this.keyMap[2].map((key) => this.renderSquareKey(key))}
                </div>
                <div className="keyboard-line line-4">
                    {this.keyMap[3].map((key) => this.renderSquareKey(key))}
                </div>
                <div className="line-specialkey">
                    {this.renderSpecialKey()}
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="root">
                <Game />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);