import { h, Component } from 'preact'

import Editor from './editor'

export default class App extends Component<{},{}> {
  render () {
    return (
      <main>
        <Editor
          onSave={console.log}
        />
      </main>
    )
  }
}
