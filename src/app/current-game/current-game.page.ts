import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})

export class CurrentGamePage implements OnInit {

  constructor(private gameDataService: GameDataService) {}

  timeControl = "";
  opponentName = "";
  color = "";

  ngOnInit() {
    this.color = this.gameDataService.getColor();
    this.opponentName = this.gameDataService.getOpponentName();
    this.timeControl = this.gameDataService.getTimeControl();
  }
}
