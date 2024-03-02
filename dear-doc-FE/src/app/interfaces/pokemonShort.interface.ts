import { Ability, Stat, Type } from './pokemon.interface';

export interface PokemonShort {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  abilities: Ability[];
  stats: Stat[];
  image: any;
}
