import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//function Square(){
//    return (
//            <button className="square">
//                {this.props.value};
//            </button>
//      )
//}
//と同義
//クラス一個でコンポーネント一個分
//props: 親コンポーネントから子コンポーネントへ渡す値。変更不可
//state: コンポーネントが保持する状態の値。変更可
//stateとpropsは非同期に更新される（同期させるた処理をしたい場合はsetStateメソッドを使う）
//
class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {this.props.value};
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

