import { Component, h } from 'preact'
import linkState from 'linkstate'

import { IRecipe, RECIPE_DEFAULT, HOWTOSTEP_DEFAULT } from '../../types/schema'
import Control from '../control'

export interface IEditorProps {
  onSave: (currentItem: IRecipe) => void,
}

export interface IEditorState {
  currentItem: IRecipe,
  ingredients: string,
  instructions: string,
}

function splitTextarea (value: string) {
  return value
    .split('\n')
    .map(s => s.trim())
}

export default class Editor extends Component<IEditorProps, IEditorState> {
  state: IEditorState = {
    currentItem: { ...RECIPE_DEFAULT },
    ingredients: '',
    instructions: '',
  }

  formSubmit = (e: Event) => {
    e.preventDefault()

    const currentItem: IRecipe = {
      ...RECIPE_DEFAULT,
      ...this.state.currentItem,
      recipeIngredient: splitTextarea(this.state.ingredients),
      recipeInstructions: splitTextarea(this.state.instructions)
        .map(text => ({
          ...HOWTOSTEP_DEFAULT,
          text,
        })),
    }

    this.props.onSave(currentItem)
  }

  render ({}: IEditorProps, { currentItem, ...state }: IEditorState) {
    return (
      <form
        onSubmit={this.formSubmit}
      >
        <Control
          label='Name'
          value={currentItem.name}
          onChange={linkState(this, 'currentItem.name')}
          type='text'
        />

        <Control
          label='Description'
          value={currentItem.description}
          onChange={linkState(this, 'currentItem.description')}
          type='textarea'
        />

        <Control
          label='Ingredients'
          value={state.ingredients}
          onChange={linkState(this, 'ingredients')}
          type='textarea'
        />

        <Control
          label='Instructions'
          value={state.instructions}
          onChange={linkState(this, 'instructions')}
          type='textarea'
        />

        <button
          type='submit'
        >
          Save
        </button>
      </form>
    )
  }
}
