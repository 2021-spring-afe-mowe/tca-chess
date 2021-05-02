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
  chosenTimeControl: string = "Any";

  constructor(private localStorageService: LocalStorageService, public toastController: ToastController) {
  }

  async updateColorFilter() : Promise<void> {
    if (this.chosenColor === "Black") {
      this.myGames = this.myGames.filter(game => game.color === "Black")
    }

    if (this.chosenColor === "White") {
      this.myGames = this.myGames.filter(game => game.color === "White");
    }

    this.filterMyGamesByWinLoseDraw();
  }

  async updateTimeControlFilter() : Promise<void> {
    if (this.chosenTimeControl === "Classical") {
      this.myGames = this.myGames.filter(game => game.timeControl === "Classical")
    }

    if (this.chosenTimeControl === "Blitz") {
      this.myGames = this.myGames.filter(game => game.timeControl === "Blitz");
    }

    this.filterMyGamesByWinLoseDraw();
  }

  async filterMyGamesByWinLoseDraw() {
    this.gamesWon = this.myGames.filter(game => game.gameResult === "Win");
    this.gamesLost = this.myGames.filter(game => game.gameResult === "Lose");
    this.gamesDrawn = this.myGames
      .filter(game => game.gameResult === "Draw").sort((a, b) => a.dateCreated - b.dateCreated);
  }

  async presentGameDeletedToast(game) {
    let message = 'Your game against ' + game.opponentName + ' has been deleted';
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async updateFilters() {
    // When we update, we always get all games and then apply both filters
    await this.getAllGames();
    await this.updateColorFilter();
    await this.updateTimeControlFilter();
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

      result = result.sort((a, b) => {
        if (a.dateCreated > b.dateCreated) {
          return -1
        }
        if (a.dateCreated < b.dateCreated) {
          return 1
        }
        return 0
      });

      this.myGames = result;

      this.filterMyGamesByWinLoseDraw();
    }
  }

  async deleteGame(game) {
    let gameKey = new Date(game.dateCreated).getTime();
    await this.localStorageService.clearByKey(gameKey);
    await this.presentGameDeletedToast(game);
    await this.getAllGames();
  }

  async ionViewDidEnter() {
    await this.getAllGames();
  }

  async ngOnInit() {
  }
}
