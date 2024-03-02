import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [PokemonService, ConfigService],
  controllers: [PokemonController],
})
export class PokemonModule {}
