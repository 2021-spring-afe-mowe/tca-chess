import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.page.html',
  styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {

  constructor(private localStorageService: LocalStorageService) {
  }

  clearGames() {
    this.localStorageService.set("loved", "one");
  }

  ngOnInit() {
  }

}
