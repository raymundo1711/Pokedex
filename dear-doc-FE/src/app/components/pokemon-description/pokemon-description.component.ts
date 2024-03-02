import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonShort } from '../../interfaces/pokemonShort.interface';
import { concatMap, of, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-pokemon-description',
  templateUrl: './pokemon-description.component.html',
  styleUrls: ['./pokemon-description.component.scss'],
})
export class PokemonDescriptionComponent {
  private route = inject(ActivatedRoute);

  private pokemonService = inject(PokemonService);

  public pokemon: PokemonShort | undefined;

  public isLoading = false;

  id: string | null = null;
  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((params) => {
          const { id } = params;
          return id
            ? this.pokemonService.getPokemon(id)
            : of({} as PokemonShort);
        })
      )
      .subscribe(
        (pokemon) => {
          this.pokemon = pokemon.name ? pokemon : undefined;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
        }
      );
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

  getHabitatColor(habitat: string | undefined): string {
    console.log(habitat);
    const habilitates = {
      stench: '#8B4513',
      drizzle: '#4682B4',
      'speed-boost': '#FF4500',
      'battle-armor': '#708090',
      sturdy: '#B8860B',
      damp: '#00CED1',
      limber: '#FFD700',
      'sand-veil': '#D2B48C',
      static: '#FFFF00',
      'volt-absorb': '#F8D030',
      'water-absorb': '#1E90FF',
      oblivious: '#F5F5F5',
      'cloud-nine': '#87CEEB',
      'compound-eyes': '#3CB371',
      insomnia: '#483D8B',
      'color-change': '#DDA0DD',
      immunity: '#98FB98',
      'flash-fire': '#FF6347',
      'shield-dust': '#BC8F8F',
      'own-tempo': '#FFB6C1',
    };

    return habilitates[habitat as keyof typeof habilitates] ?? '#68A090';
  }
}
