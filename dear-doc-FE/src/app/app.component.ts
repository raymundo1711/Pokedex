import { Component, HostListener, inject } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { PokemonShort } from './interfaces/pokemonShort.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
