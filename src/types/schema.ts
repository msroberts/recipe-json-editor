export interface ISchema<T> {
  '@context': 'http://schema.org/',
  '@type': T,
}

export interface IRecipe extends ISchema<'Recipe'> {
  name: string,
}

export const RECIPE_DEFAULT: IRecipe = {
  '@context': 'http://schema.org/',
  '@type': 'Recipe',
  name: '',
}
