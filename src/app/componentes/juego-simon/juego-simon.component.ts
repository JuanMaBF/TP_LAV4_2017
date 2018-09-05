import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'juego-simon',
  templateUrl: './juego-simon.component.html',
  styleUrls: ['./juego-simon.component.css']
})
export class JuegoSimonComponent {

  public gameStarted: boolean = false;

  public constructor() { 

  }

  public startGame(): void {
    this.gameStarted = true;
  }

  public endGame(): void {
    this.gameStarted = false;
  }

}
