import 'preact-material-components/Theme/style.css'

import { h, Component } from 'preact'

import Editor from './editor'
import { IRecipe } from '../types/schema'
import { showSaveDialog } from './helpers/remote'
import { writeFileAsync } from './helpers/fs-async'

export interface IAppState {
  filename?: string,
}

export default class App extends Component<{}, IAppState> {
  state: IAppState = {}

  openFile = async (filename: string) => {
    this.setState({ filename })
  }

  saveFile = async (data: IRecipe) => {
    const filename = this.state.filename || await showSaveDialog()

    if (filename) {
      await writeFileAsync(filename, JSON.stringify(data, null, 2))
    }
  }

  clearForm = () => {
    this.setState({ filename: undefined })
  }

  render () {
    return (
      <main>
        <Editor
          onClear={this.clearForm}
          onOpen={this.openFile}
          onSave={this.saveFile}
        />
      </main>
    )
  }
}
