import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ToastController } from '@ionic/angular';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.page.html',
  styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {

  myGames: any[] = [];
  gamesWon: any[] = [];
  gamesLost: any[] = [];
  gamesDrawn: any[] = [];
  chosenColor: string = "Any";
  chosenTimeControl: string = "";

  constructor(private localStorageService: LocalStorageService, public toastController: ToastController) {
  }

  async clearGames() {
    await this.localStorageService.clearAll();
    await this.presentToast();
    await this.getAllGames();
  }

  async updateColorFilter(color: string) {
    await this.getAllGames();

    if (color === "Black") {
      this.myGames = this.myGames.filter(game => game.color === "Black")
    }

    if (color === "White") {
      this.myGames = this.myGames.filter(game => game.color === "White");
    }

    this.filterMyGamesByWinLoseDraw();
  }

  async updateTimeControlFilter(timeControl: string) {
    await this.getAllGames();

    if (timeControl === "Classical") {
      this.myGames = this.myGames.filter(game => game.timeControl === "Classical")
    }

    if (timeControl === "Blitz") {
      this.myGames = this.myGames.filter(game => game.timeControl === "Blitz");
    }

    this.filterMyGamesByWinLoseDraw();
  }

  async filterMyGamesByWinLoseDraw() {
    this.gamesWon = this.myGames.filter(game => game.gameResult === "Win");
    this.gamesLost = this.myGames.filter(game => game.gameResult === "Lose");
    this.gamesDrawn = this.myGames.filter(game => game.gameResult === "Draw");
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your games have been cleared.',
      duration: 2000
    });
    toast.present();
  }

  async getAllGames() {
    let gameKeys = await this.localStorageService.getAllKeys();

    if (gameKeys) {
      let games = []
      gameKeys.map(async (gameKey) => {
        let game = this.localStorageService.get(gameKey);
        games.push(game);
      });
      let result = await Promise.all(games);
      this.myGames = result;
      this.filterMyGamesByWinLoseDraw();
    }
  }

  ngOnInit() {
    this.getAllGames();
  }

}
