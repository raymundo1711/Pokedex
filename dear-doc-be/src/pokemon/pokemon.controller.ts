import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonController: PokemonService) {}

  @Get()
  async getPokemon(@Query() query: { name: string }) {
    return await this.pokemonController.getPokemon(query);
  }

  @Get('paginate')
  async getPaginatedPokemon(@Query() query: { limit: number; offset: number }) {
    return await this.pokemonController.getPaginatedPokemon(query);
  }
}
