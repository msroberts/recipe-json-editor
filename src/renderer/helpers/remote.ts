import { remote } from 'electron'

export function showSaveDialog () {
  return new Promise<string>((resolve) => {
    remote.dialog.showSaveDialog({}, resolve)
  })
}
