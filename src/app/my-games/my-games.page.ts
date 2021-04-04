import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.page.html',
  styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {

  myGames: any[] = [];
  gamesWon: number = 0;
  gamesLost: number = 0;
  gamesDrawn: number = 0;

  constructor(private localStorageService: LocalStorageService, public toastController: ToastController) {
  }

  async clearGames() {
    await this.localStorageService.clearAll();
    await this.presentToast();
    await this.getAllGames();
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
      this.gamesWon = result.filter(game => game.gameResult === "Win").length;
      this.gamesLost = result.filter(game => game.gameResult === "Lose").length;
      this.gamesDrawn = result.filter(game => game.gameResult === "Draw").length;
    }
  }

  ngOnInit() {
    this.getAllGames();
  }

}
