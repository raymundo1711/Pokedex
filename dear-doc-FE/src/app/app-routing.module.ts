import { NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDescriptionComponent } from './components/pokemon-description/pokemon-description.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pokedex',
  },
  {
    path: 'pokemon/:id',
    component: PokemonDescriptionComponent,
  },

  {
    path: 'pokedex',
    component: PokemonListComponent,
  },
  {
    path: '**',
    redirectTo: 'pokedex',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgFor],
  exports: [RouterModule],
})
export class AppRoutingModule {}
