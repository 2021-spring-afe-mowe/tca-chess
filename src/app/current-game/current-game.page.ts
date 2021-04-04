import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})

export class CurrentGamePage implements OnInit {

  constructor(
    private gameDataService: GameDataService,
    private localStorageService: LocalStorageService,
    public toastController: ToastController) { }

  timeControl = "";
  opponentName = "";
  color = "";
  gameResult = "";

  setWin() {
    this.gameResult = "Win"
  }

  setLose() {
    this.gameResult = "Lose"
  }

  setDraw() {
    this.gameResult = "Draw"
  }

  async saveGame() {
    let thisGame = {
      dateCreated: new Date(),
      timeControl: this.timeControl,
      opponentName: this.opponentName,
      color: this.color,
      gameResult: this.gameResult
    }

    this.localStorageService.set(new Date().getTime().toString(), thisGame);
    await this.presentSaveToast();
  }

  async presentSaveToast() {
    const toast = await this.toastController.create({
      message: 'Your game has been saved.',
      duration: 2000
    });
    toast.present();
}

  ngOnInit() {
    this.color = this.gameDataService.getColor();
    this.opponentName = this.gameDataService.getOpponentName();
    this.timeControl = this.gameDataService.getTimeControl();
  }
}
