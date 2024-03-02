import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pokemon } from './interfaces/pokemon.interface';
import { getPokemonMainData } from './utilities/getPokemonMainData';

@Injectable()
export class PokemonService {
  constructor(private readonly configService: ConfigService) {}
  async getPokemon(query: { name: string }) {
    const { name } = query;
    if (!name) {
      throw new HttpException('Name is required', HttpStatus.BAD_REQUEST);
    }

    const URL = this.configService.get<string>('POKEMON_API_URL');

    const resp = await fetch(`${URL}/${name}`);

    if (!resp.ok) {
      throw new HttpException(
        'Pokemon not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data = (await resp.json()) as Pokemon;

    const pokemonMainData = getPokemonMainData(data);

    return pokemonMainData;
  }

  async getPaginatedPokemon(query: { limit: number; offset: number }) {
    const { limit, offset } = query;

    const errorMessages = {
      LIMIT_OFFSET_REQUIRED: 'Limit and offset are required',
      LIMIT_RANGE: 'Limit must be between 1 and 100',
      OFFSET_MIN: 'Offset must be greater than or equal to 0',
    };

    if (!limit || !offset)
      throw new HttpException(
        errorMessages.LIMIT_OFFSET_REQUIRED,
        HttpStatus.BAD_REQUEST,
      );
    if (limit > 100 || limit < 1)
      throw new HttpException(
        errorMessages.LIMIT_RANGE,
        HttpStatus.BAD_REQUEST,
      );
    if (offset < 0)
      throw new HttpException(errorMessages.OFFSET_MIN, HttpStatus.BAD_REQUEST);

    const URL = this.configService.get<string>('POKEMON_API_URL');

    const response = await this.fetchJSON(
      `${URL}?limit=${limit}&offset=${offset}`,
    );

    const pokemonDetails = await Promise.all(
      response.results.map((pokemon) =>
        this.fetchPokemonDetails(URL, pokemon.name),
      ),
    );

    return pokemonDetails;
  }

  async fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok)
      throw new HttpException(
        'Pokemons not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return response.json();
  }

  async fetchPokemonDetails(baseURL, name) {
    const details = await this.fetchJSON(`${baseURL}/${name}`);
    return getPokemonMainData(details);
  }
}
