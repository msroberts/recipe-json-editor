import { Component, h } from 'preact'
import linkState from 'linkstate'

import { IRecipe, RECIPE_DEFAULT } from '../../types/schema'
import Control from '../control'

export interface IEditorProps {
  onSave: (currentItem: IRecipe) => void,
}

export interface IEditorState {
  currentItem: IRecipe,
}

export default class Editor extends Component<IEditorProps, IEditorState> {
  state: IEditorState = {
    currentItem: { ...RECIPE_DEFAULT },
  }

  formSubmit = (e: Event) => {
    e.preventDefault()

    this.props.onSave(this.state.currentItem)
  }

  render ({}: IEditorProps, { currentItem }: IEditorState) {
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

        <button
          type='submit'
        >
          Save
        </button>
      </form>
    )
  }
}
