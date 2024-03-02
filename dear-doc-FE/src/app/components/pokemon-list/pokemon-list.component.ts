import { Component, HostListener, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonShort } from '../../interfaces/pokemonShort.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  private pokemonService = inject(PokemonService);

  private localStorage = inject(LocalStorageService);

  private router = inject(Router);

  title = 'Pokedex';

  favorites = {};

  searchText: string = '';
  pokemonList: PokemonShort[] = [];

  limit: number = 10;

  offset: number = 0;

  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    this.getFavorites();
    this.loadMore();
    window.addEventListener('scroll', this.onScroll.bind(this), true);
  }

  search(event: any): void {
    this.searchText = event.target.value;
  }

  searchPokemon(): void {
    this.router.navigate(['/pokemon', this.searchText]);
  }

  loadMore(): void {
    this.pokemonService
      .getPaginatedPokemon({ limit: this.limit, offset: this.offset })
      .subscribe((pokemonList) => {
        this.pokemonList.push(...pokemonList);
        this.offset += this.limit;
        this.isLoading = false;
      });
  }

  getTypeColor(type: string | undefined): string {
    const pokemonTypes = {
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
      unknown: '#68A090',
      shadow: '#604E82',
    };

    return pokemonTypes[type as keyof typeof pokemonTypes] ?? '#68A090';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.isLoading
    ) {
      this.isLoading = true;
      this.loadMore();
    }
  }

  addFavorite(event: any, pokemon: PokemonShort): void {
    event.stopPropagation();
    const { id } = pokemon;

    const favorites = this.localStorage.getItem('favorites') || '{}';

    const parsedFavorites = JSON.parse(favorites);

    parsedFavorites[id] = pokemon;

    console.log(parsedFavorites);

    this.localStorage.setItem('favorites', JSON.stringify(parsedFavorites));

    this.getFavorites();
  }

  removeFavorite(event: any, pokemon: PokemonShort): void {
    event.stopPropagation();
    const { id } = pokemon;

    const favorites = this.localStorage.getItem('favorites') || '{}';

    const parsedFavorites = JSON.parse(favorites);

    delete parsedFavorites[id];

    this.localStorage.setItem('favorites', JSON.stringify(parsedFavorites));

    this.getFavorites();
  }

  getFavorites(): void {
    const favorites = this.localStorage.getItem('favorites') || '{}';

    const parsedFavorites = JSON.parse(favorites);

    this.favorites = parsedFavorites;
  }

  isFavorite(pokemon: PokemonShort): boolean {
    const { id } = pokemon;

    return this.favorites[id as keyof typeof this.favorites] !== undefined;
  }
}
