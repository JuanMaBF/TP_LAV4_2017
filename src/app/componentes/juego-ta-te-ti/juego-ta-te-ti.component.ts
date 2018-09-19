import { Component } from "@angular/core";


@Component({
  selector: 'my-tic-tac-toe',
  template: `
    <div class="tic-tac-toe">
      <div class="holder">
        <div class="row buttons choose-symbol" [ngClass]="{'active': !tableIsVisible}">
          <h3>choose X or O</h3>
          <button class="col s4" (click)="setPlayerSymbol('X')">X</button>
          <button class="col s4" (click)="setPlayerSymbol('O')">O</button>
        </div>

        <div id="message" class="center"></div>

        <div class="table-wrapper" [ngClass]="{'active': tableIsVisible}">
          <table>
            <tr>
              <td (click)="makeAMove($event, 0)"></td>
              <td (click)="makeAMove($event, 1)"></td>
              <td (click)="makeAMove($event, 2)"></td>
            </tr>
            <tr>
              <td (click)="makeAMove($event, 3)"></td>
              <td (click)="makeAMove($event, 4)"></td>
              <td (click)="makeAMove($event, 5)"></td>
            </tr>
            <tr>
              <td (click)="makeAMove($event, 6)"></td>
              <td (click)="makeAMove($event, 7)"></td>
              <td (click)="makeAMove($event, 8)"></td>
            </tr>
          </table>

          <div class="row buttons">
            <button
              class="col s4 restart"
              (click)="restart()"
            >restart</button>
          </div>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['juego-ta-te-ti.scss']
})
export class TicTacToeComponent {
  game: Game;
  ai: Ai;
  utils = new UtilService();
  public tableIsVisible = false;
  public aiSymbol = 'O';
  public playerSymbol = 'X';

  setPlayerSymbol(symbol: string): void {
    const turn = this._getTurn(symbol);
    this._setSymbols(symbol);

    this.tableIsVisible = true;
    let ai = new Ai();
    this.game = new Game(ai, turn, this.playerSymbol, this.aiSymbol);
    ai.plays(this.game);

    this.game.start();
  }

  makeAMove(event: any, index: number) {
    const element = event.target;
    if (
      this.game.status === 'running' &&
      this.game.currentState.turn === 'player' &&
      !element.innerHTML
    ) {
      const next = new State(this.game.currentState);
      next.board[index] = 'player';
      this.utils.insertAt(index, this.game.playerSymbol);
      next.nextTurn();
      this.game.advanceTo(next);
    }
  }

  restart() {
    this.tableIsVisible = false;
    this.utils.clearTheTable();
  }

  _getTurn(symbol: string) {
    return symbol === 'X' ? 'player' : 'ai';
  }

  _setSymbols(symbol: string) {
    if (symbol === 'X') {
      this.playerSymbol = 'X';
      this.aiSymbol = 'O';
    } else {
      this.playerSymbol = 'O';
      this.aiSymbol = 'X';
    }
  }
} 
//bootstrap(TicTacToeComponent);

class AiAction {
  public movePosition: number;
  public minimaxVal: number;

  static ascending(firstAction, secondAction): number {
    if (firstAction.minimaxVal < secondAction.minimaxVal) {
      return -1;
    } else if (firstAction.minimaxVal > secondAction.minimaxVal) {
        return 1;
    } else {
      return 0;
    }
  }

  static descending(firstAction, secondAction): number {
    if (firstAction.minimaxVal > secondAction.minimaxVal) {
      return -1;
    } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
      return 1;
    } else {
      return 0;
    }
  }

  constructor(position: number) {
    this.movePosition = position;
  }

  applyTo(state: State) {
    const next = new State(state);
    next.board[this.movePosition] = state.turn;

    if (state.turn === 'ai') {
      next.oMovesCount++;
    }

    next.nextTurn();
    return next;
  }
}

class Ai {
  game: Game;
  utils = new UtilService();

  _minimaxValue(state: State) {
    if (state.isVictory()) {
      return Game.score(state);
    } else {
      let stateScore: number;

      if (state.turn === 'player') {
        stateScore = -1000;
      } else {
        stateScore = 1000;
      }

      let availablePositions = state.emptyCells();
      let availableNextStates = availablePositions.map((position: number) => {
        const action = new AiAction(position);
        const nextState = action.applyTo(state);
        return nextState;
      });

      availableNextStates.forEach((nextState: State) => {
        const nextScore = this._minimaxValue(nextState);
        if (state.turn === 'player') {
          if (nextScore > stateScore) {
            stateScore = nextScore;
          }
        } else {
          if (nextScore < stateScore) {
            stateScore = nextScore;
          }
        }
      });

      return stateScore;
    }
  }

  plays(_game: Game) {
    this.game = _game;
  };

  notify(turn: string): void {
    this.makeAMove(turn);
  };

  makeAMove(turn: string): void {
    let available = this.game.currentState.emptyCells();
    let availableActions = this._getAvailableActions(available);

    if (turn === 'player') {
      availableActions.sort(AiAction.descending);
    } else {
      availableActions.sort(AiAction.ascending);
    }

    let chosenAction = availableActions[0];
    let next = chosenAction.applyTo(this.game.currentState);
    this.utils.insertAt(chosenAction.movePosition, this.game.aiSymbol);
    this.game.advanceTo(next);
  }

  _getAvailableActions(available) {
    return available.map((position: number) => {
      let action = new AiAction(position);
      let next = action.applyTo(this.game.currentState);
      action.minimaxVal = this._minimaxValue(next);
      return action;
    });
  }
}

class Game {
  public ai: any;
  public currentState: State;
  public status: string;
  public playerSymbol: string;
  public aiSymbol: string;
  utils = new UtilService();

  static score(_state: State): number {
    if (_state.status === 'player is the winner!') {
      return 10 - _state.oMovesCount;
    } else if (_state.status === 'player is the winner!') {
      return - 10 + _state.oMovesCount;
    } else {
      return 0;
    }
  }

  constructor(
    autoPlayer: any,
    turn: string,
    playerSymbol: string,
    aiSymbol: string
  ) {
    this.ai = autoPlayer;
    this.currentState = new State();
    this.currentState.board = [
      '', '', '',
      '', '', '',
      '', '', ''
    ];
    this.playerSymbol = playerSymbol;
    this.aiSymbol = aiSymbol;
    this.currentState.turn = turn;
    this.status = 'begining';
  }

  advanceTo(_state: State): void {
    this.currentState = _state;
    if (_state.isVictory()) {
      this.status = 'ended';
      this.utils.displayMessage(_state.status);
    } else {
      if (this.currentState.turn === 'ai') {
        this.ai.notify('ai');
      }
    }
  }

  start() {
    if (this.status = 'beginning') {
      this.advanceTo(this.currentState);
      this.status = 'running';
    }
  }
}

class State {
  public turn = '';
  public oMovesCount = 0;
  public status = 'running';
  public board = [];

  constructor(oldState = undefined) {
    if (oldState) {
      this._initStateWithOldData(oldState);
    }
  }

  nextTurn(): void {
    this.turn = this.turn === 'player' ? 'ai' : 'player';
  }

  emptyCells(): number[] {
    let indeces = [];
    for (let index = 0; index < 9; ++index) {
      if (this.board[index] === '') {
        indeces.push(index);
      }
    }
    return indeces;
  }

  isVictory(): boolean {
    if (this._isRowVictory()) {
      return true;
    }

    if (this._isColumnVictory()) {
      return true;
    }

    if (this._isDiagonalVictory()) {
      return true;
    }

    if (this._isDraw()) {
      return true;
    }
    return false;
  }

  _initStateWithOldData(oldState: State): void {
    this.board = this._getNewBoardFromOldOne(oldState.board);
    this.oMovesCount = oldState.oMovesCount;
    this.status = oldState.status;
    this.turn = oldState.turn;
  }

  _getNewBoardFromOldOne(oldBoard: string[]): string[] {
    let result = new Array(this.board.length);
    for (let itr of oldBoard) {
      result.push(itr);
    }
    return result;
  }

  _isRowVictory(): boolean {
    let isVictory = false;
    for (let i = 0; i <= 6; i = i + 3) {
      if (
        this.board[i] !== '' &&
        this.board[i] === this.board[i + 1] &&
        this.board[i + 1] === this.board[i +   2]
      ) {
        this._setStatus(this.board[i]);
        isVictory = true;
      }
    }
    return isVictory;
  }

  _isColumnVictory(): boolean {
    let isVictory = false;
    for (let i = 0; i <= 2 ; i++) {
      if (
        this.board[i] !== '' &&
        this.board[i] === this.board[i + 3] &&
        this.board[i + 3] === this.board[i +   6]
      ) {
        this._setStatus(this.board[i]);
        isVictory = true;
      }
    }
    return isVictory;
  }

  _isDiagonalVictory(): boolean {
    let isVictory = false;
    for (let i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if (
        this.board[i] !== '' &&
        this.board[i] === this.board[i + j] &&
        this.board[i + j] === this.board[i + 2 * j]
      ) {
        this._setStatus(this.board[i]);
        isVictory = true;
      }
    }
    return isVictory;
  }

  _isDraw() {
    let isDraw = false;
    const emptyCells = this.emptyCells();
    if (emptyCells.length === 0) {
      this._setStatus('It is a draw!', false);
      isDraw = true;
    }

    return isDraw;
  }

  _setStatus(status: string, isVictory = true): void {
    if (isVictory) {
      this.status = status + ' is the winner!';
    } else {
      this.status = status;
    }
  }
}

class UtilService {
  displayMessage(message: string): void {
    const element = document.body.querySelector('#message');
    element.innerHTML = message.toUpperCase();
  }

 insertAt(index: number, symbol: string): void {
    const board = document.body.querySelectorAll('td');
    const targetCell = board[index];
    if (!targetCell.innerHTML) {
      targetCell.textContent = symbol;
      targetCell.classList.add(symbol === 'O' ? 'o-symbol' : 'x-symbol');
    }
  }

  clearTheTable() {
    this._clearTheBoard();
    this._clearTheMessage();
  }

  _clearTheMessage() {
    const message = document.body.querySelector('#message');
    message.innerHTML = '';
  }

  _clearTheBoard() {
    const board = document.body.querySelectorAll('td');
    board.forEach(b => {
        b.innerHTML = '';

        if (b.hasAttribute('class')) {
          b.attributes.removeNamedItem('class');
        }
    });
  }
}
