import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PokemonShort } from '../interfaces/pokemonShort.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  constructor() {}

  getPokemon(query: string) {
    const API_URL = environment.API_URL;
    return this.http.get<PokemonShort>(`${API_URL}/pokemon?name=${query}`);
  }

  getPaginatedPokemon(query: { limit: number; offset: number }) {
    const { limit, offset } = query;
    const API_URL = environment.API_URL;
    return this.http.get<PokemonShort[]>(
      `${API_URL}/pokemon/paginate?limit=${limit}&offset=${offset}`
    );
  }
}
