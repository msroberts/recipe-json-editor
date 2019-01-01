import { Component, h } from 'preact'
import linkState from 'linkstate'

import TextField from 'preact-material-components/TextField'

import { IRecipe, RECIPE_DEFAULT, HOWTOSTEP_DEFAULT } from '../../types/schema'
import { showOpenDialog } from '../helpers/remote'
import { readFileAsync } from '../helpers/fs-async'

export interface IEditorProps {
  onClear: () => void,
  onOpen: (filename: string) => void,
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

  openFile = async () => {
    const [filename] = await showOpenDialog()

    this.props.onOpen(filename)

    const currentItem: IRecipe = JSON.parse(await readFileAsync(filename))

    const ingredients = (currentItem.recipeIngredient || [])
      .join('\n')

    const instructions = (currentItem.recipeInstructions || [])
      .map(step => step.text)
      .join('\n')

    this.setState({ currentItem, ingredients, instructions })
  }

  clearForm = () => {
    this.setState({
      currentItem: RECIPE_DEFAULT,
      ingredients: '',
      instructions: '',
    })

    this.props.onClear()
  }

  render ({}: IEditorProps, { currentItem, ...state }: IEditorState) {
    return (
      <form
        onSubmit={this.formSubmit}
      >
        <TextField
          label='Name'
          value={currentItem.name}
          onChange={linkState(this, 'currentItem.name')}
          type='text'
        />

        <TextField
          label='Description'
          value={currentItem.description}
          onChange={linkState(this, 'currentItem.description')}
          type='text'
          textarea={true}
        />

        <TextField
          label='Ingredients'
          value={state.ingredients}
          onChange={linkState(this, 'ingredients')}
          type='text'
          textarea={true}
        />

        <TextField
          label='Instructions'
          value={state.instructions}
          onChange={linkState(this, 'instructions')}
          type='text'
          textarea={true}
        />

        <button
          type='submit'
        >
          Save
        </button>

        <button
          type='button'
          onClick={this.clearForm}
        >
          New
        </button>

        <button
          type='button'
          onClick={this.openFile}
        >
          Open
        </button>
      </form>
    )
  }
}
