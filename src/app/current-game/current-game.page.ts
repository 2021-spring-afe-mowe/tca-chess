import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("current game here")
  }
}
