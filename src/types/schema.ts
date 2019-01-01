export interface ISchema<T> {
  '@context': 'http://schema.org/',
  '@type': T,
}

export interface IRecipe extends ISchema<'Recipe'> {
  name: string,
  description: string,
  recipeIngredient: string[],
  recipeInstructions: IHowToStep[],
}

export interface IHowToStep extends ISchema<'HowToStep'> {
  text: string,
}

export const RECIPE_DEFAULT: IRecipe = {
  '@context': 'http://schema.org/',
  '@type': 'Recipe',
  name: '',
  description: '',
  recipeIngredient: [],
  recipeInstructions: [],
}

export const HOWTOSTEP_DEFAULT: IHowToStep = {
  '@context': 'http://schema.org/',
  '@type': 'HowToStep',
  text: '',
}
