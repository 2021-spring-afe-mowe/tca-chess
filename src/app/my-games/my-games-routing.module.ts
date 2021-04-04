import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyGamesPage } from './my-games.page';

const routes: Routes = [
  {
    path: '',
    component: MyGamesPage
  }
];

@NgModule({
  imports: [ 
    FormsModule,  
    MbscModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyGamesPageRoutingModule {}
