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
      this.gamesWon = result.filter(game => game.gameResult === "Win");
      this.gamesLost = result.filter(game => game.gameResult === "Lose");
      this.gamesDrawn = result.filter(game => game.gameResult === "Draw");
    }
  }

  ngOnInit() {
    this.getAllGames();
  }

}
