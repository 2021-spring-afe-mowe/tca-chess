import { Component } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private gameDataService: GameDataService,
    private router: Router) {

  }

  timeControl = "Classical";
  opponentName = "";
  color = "White";

  goToStartGame() {
    this.gameDataService.setTimeControl(this.timeControl);
    this.gameDataService.setColor(this.color);
    this.gameDataService.setOpponentName(this.opponentName);
    this.router.navigate(["/current-game"]);
  }

}
