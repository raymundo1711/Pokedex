import { Pokemon } from '../interfaces/pokemon.interface';

export const getPokemonMainData = (pokemon: Pokemon) => {
  const { id, name, height, weight, types, abilities, stats, sprites } =
    pokemon;

  const DEFAULT_IMAGE = 'front_default';
  const lastResourceImage = Object.keys(sprites).pop() ?? '';

  const image = sprites[DEFAULT_IMAGE] || sprites[lastResourceImage];

  return {
    id,
    name,
    height,
    weight,
    types,
    abilities,
    stats,
    image,
  };
};
