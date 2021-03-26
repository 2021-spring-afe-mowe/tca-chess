import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private timeControl = '';
  private color = '';
  private opponentName = '';

  constructor() { }

// Home page sets data
  setTimeControl(chosenTimeControl: string) {
    this.timeControl = chosenTimeControl;
  }

// Current game page gets data
  getTimeControl() {
    return this.timeControl;
  }

  setColor(chosenColor: string) {
    this.color = chosenColor;
  }

  getColor() {
    return this.color;
  }

  setOpponentName(chosenOpponentName: string) {
    this.opponentName = chosenOpponentName;
  }

  getOpponentName() {
    return this.opponentName;
  }
}
