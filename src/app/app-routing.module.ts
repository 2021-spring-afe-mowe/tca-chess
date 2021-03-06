import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then( m => m.HomePageModule)
  },
  {
    path: 'current-game',
    loadChildren: () => import('./current-game/current-game.module')
      .then( m => m.CurrentGamePageModule)
  },
  {
    path: 'my-games',
    loadChildren: () => import('./my-games/my-games.module')
      .then( m => m.MyGamesPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot
    (routes
      , {
        preloadingStrategy: PreloadAllModules
        , useHash: true
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
