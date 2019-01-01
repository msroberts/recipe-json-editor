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

  saveFile = async (data: IRecipe) => {
    const filename = this.state.filename || await showSaveDialog()

    await writeFileAsync(filename, JSON.stringify(data, null, 2))
  }

  render () {
    return (
      <main>
        <Editor
          onSave={this.saveFile}
        />
      </main>
    )
  }
}
